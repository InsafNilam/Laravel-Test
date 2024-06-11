<?php

namespace App\Services;

use App\Models\FileRepo;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Storage;

class FileManager
{
    /**
     * Uploads a file to storage and creates a file record in the database.
     *
     * This method checks if the provided file is not null. If the file is null, it returns false.
     *
     * If the file is not null, it generates a file name using the current timestamp and the original name of the file.
     * It then checks if a directory with the name of the reference table exists in the 'public' disk storage.
     * If the directory does not exist, it creates the directory.
     *
     * The method then uploads the file to the 'public' disk storage, placing it in the directory named after the reference table.
     * It reads the contents of the file and writes them to the storage.
     *
     * After the file has been uploaded, the method creates a new file record in the database.
     * The record includes the reference ID, reference table name, file path, current timestamp as the created and updated times, and the provided version.
     *
     * Finally, the method returns true to indicate that the file has been successfully uploaded and the record has been created.
     *
     * @param string $ref_table_name The name of the reference table.
     * @param int    $ref_id         The ID of the record in the reference table.
     * @param mixed  $file           The file to upload. If null, the method returns false.
     * @param string $version        The version of the file. Defaults to 'V0'.
     * @return FileRepo              If the file was successfully uploaded and the record was created returns the file.
     *
     * @throws Exception If the file is null or if there is an issue uploading the file.
     */
    public static function upload(string $ref_table_name, int $ref_id, $file = null, $version = 'V0'): FileRepo
    {
        try {
            if ($file != null) {
                $fileName = Carbon::now()->getTimestamp() . "√√√" . $file->getClientOriginalName();
                if (!Storage::disk('public')->exists($ref_table_name)) {
                    Storage::disk('public')->makeDirectory($ref_table_name);
                }
                Storage::disk('public')->put($ref_table_name . "/" . $fileName, file_get_contents($file));

                $file = FileRepo::create([
                    'ref_id' => $ref_id,
                    'ref_name' => $ref_table_name,
                    'path' => $ref_table_name . "/" . $fileName,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'version' => $version,
                ]);

                return $file;
            } else {
                throw new Exception("File is null");
            }
        } catch (Exception $e) {
            throw new Exception("Failed to upload file: " . $e->getMessage());
        }
    }

    /**
     * Updates the file association for a reference record, optionally preserving existing files.
     *
     * This function updates the file association for a record in a reference table identified by
     * `$ref_table_name` and `$ref_id`. It offers an option to control how existing files are handled
     * using the `$preserve` parameter.
     *
     * @param string $ref_table_name The name of the reference table where the file is associated.
     * @param int $ref_id The ID of the record in the reference table.
     * @param mixed $file (optional) The new file to be associated. Can be a file path, an uploaded file object,
     *                   or null to remove existing associations.
     * @param string $preserve (default: false) Whether to preserve existing files:
     *  - **true:** Existing files are not deleted. A new version (V + number of existing files) is uploaded.
     *  - **false (default):** Existing files are deleted from storage before uploading a new file.
     *
     * @return void This function does not return any value.
     *
     * ## Behavior based on existing files and $preserve:
     *
     * 1. **No existing files:**
     *    - If there are no existing files associated with the reference record (`$fileRepos->isEmpty()`),
     *      the function directly calls `self::upload` to upload the new `$file`.
     *
     * 2. **Existing files:**
     *    - If there are existing files associated with the reference record:
     *      - **`$preserve` is true:**
     *        - Existing files are preserved.
     *        - The new `$file` is uploaded with a version number appended ("V" + number of existing files).
     *      - **`$preserve` is false (default):**
     *        - Existing files are deleted from storage using `Storage::disk('public')->delete($fileRepo->path)`.
     *        - The new `$file` is uploaded using `self::upload`.
     */
    public static function update(string $ref_table_name, int $ref_id, $file = null, $preserve = false)
    {
        $fileRepos = FileRepo::query()->where("ref_id", $ref_id)->get();
        if ($fileRepos->isEmpty()) {
            self::upload($ref_table_name, $ref_id, $file);
        } else {
            if ($preserve) {
                self::upload($ref_table_name, $ref_id, $file, version: 'V' . count($fileRepos));
            } else {
                foreach ($fileRepos as $fileRepo) {
                    self::deleteFromStorage($fileRepo->path);
                    self::delete($fileRepo->id, false);
                }
                self::upload($ref_table_name, $ref_id, $file);
            }
        }
    }

    /**
     * Deletes a file record and optionally removes the associated file from storage.
     *
     * This function removes a file record from the database and optionally deletes the
     * corresponding file from storage. The behavior is controlled by the `$preserve` parameter.
     *
     * @param int $id The ID of the file record to delete.
     * @param bool $preserve (default: false) Whether to preserve the file in storage.
     *  - **true:** The file in storage is deleted, and the database record is marked as soft-deleted (if applicable).
     *  - **false (default):** Only the database record is marked as soft-deleted (if applicable). The file will remain in storage.
     *
     * @throws Exception If the file record with the provided ID is not found.
     *
     * @return void This function does not return any value.
     */
    public static function delete(int $id, $preserve = false)
    {
        $query = FileRepo::find($id);
        if (!$query) {
            throw new Exception("File with ID $id not found.");
        }
        if ($query) {
            if ($preserve) {
                self::deleteFromStorage($query->path);
                FileRepo::query()->where('id', $id)->delete();
            } else {
                FileRepo::query()->where('id', $id)->forceDelete();
            }
        }
    }

    public static function deleteFromStorage(string $path)
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Retrieves file paths based on reference table and ID, optionally considering trashed records.
     *
     * This function fetches file paths associated with a given reference table name and ID. It
     * offers the flexibility to include soft-deleted records based on the provided `$trash` parameter.
     *
     * @param string $ref_table_name The name of the reference table where the file is associated.
     * @param int $ref_id The ID of the record in the reference table.
     * @param string $trash (default: "none") An optional parameter to control which trashed records are included:
     *  - "none": Returns only non-trashed records (default behavior).
     *  - "with": Returns both non-trashed and trashed records.
     *  - "only": Returns only trashed records.
     *
     * @return array An array containing file information for matching records. Each element in the array
     *                 is an associative array with the following keys:
     *                  - "path": The full path to the file relative to the public storage directory.
     *                  - "id": The ID of the file record.
     */
    public static function get_path_by(string $ref_table_name, int $ref_id, $trash = 'none')
    {
        $query = FileRepo::query()
            ->where("ref_name", $ref_table_name)
            ->where("ref_id", $ref_id);

        $validTrashOptions = ["with", "only", "none"];

        if (!in_array($trash, $validTrashOptions)) {
            $trash = "none";
        }

        if ($trash === "none") {
            $query
                ->orderBy('id', 'desc');
        } else if ($trash === "with") {
            $query
                ->withTrashed()
                ->orderBy('id', 'desc');
        } else {
            $query
                ->onlyTrashed()
                ->orderBy('id', 'desc');
        }

        $fileRepos = $query->get();
        $res = [];

        foreach ($fileRepos as $value) {
            $res[] = ["id" => $value->id, "path" => asset('storage/') . '/' . $value->path, 'version' => $value->version];
        }

        return $res;
    }

    /**
     * Restores a soft-deleted file by ID.
     *
     * This function attempts to restore a file record that has been marked as soft-deleted
     * in the database. If successful, the record will be restored to a normal state and
     * the file will be accessible again (assuming the file still exists in storage).
     *
     * @param int $id The ID of the file to restore.
     *
     * @throws Exception If the file with the provided ID is not found or cannot be restored.
     *
     * @return void This function does not return any value.
     */
    public function restore(int $id)
    {
        $query = FileRepo::find($id);

        if (!$query) {
            throw new Exception("File with ID $id not found.");
        }

        if (!$query->restore()) {
            throw new Exception("Failed to restore file with ID $id.");
        }
    }
}
