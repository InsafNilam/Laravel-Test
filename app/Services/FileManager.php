<?php

namespace App\Services;

use App\Models\FileRepo;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
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
     * @return FileRepo              If the document was successfully uploaded and the record was created returns the document.
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
     * @return FileRepo If the document was successfully updated and the record was created returns the document.
     *
     * ## Behavior based on existing files and $preserve:
     *
     * 1. **No existing files:**
     *    - If there are no existing files associated with the reference record (`$documents->isEmpty()`),
     *      the function directly calls `self::upload` to upload the new `$file`.
     *
     * 2. **Existing files:**
     *    - If there are existing files associated with the reference record:
     *      - **`$preserve` is true:**
     *        - Existing files are preserved.
     *        - The new `$file` is uploaded with a version number appended ("V" + number of existing files).
     *      - **`$preserve` is false (default):**
     *        - Existing files are deleted from storage using `Storage::disk('public')->delete($document->path)`.
     *        - The new `$file` is uploaded using `self::upload`.
     */
    public static function update(string $ref_table_name, int $ref_id, $file = null, $preserve = false): FileRepo
    {
        $documents = FileRepo::query()->where("ref_id", $ref_id)->get();
        if ($documents->isEmpty()) {
            return self::upload($ref_table_name, $ref_id, $file);
        } else {
            if ($preserve) {
                return self::upload($ref_table_name, $ref_id, $file, version: 'V' . count($documents));
            } else {
                foreach ($documents as $document) {
                    self::delete($document->id, false);
                }
                return self::upload($ref_table_name, $ref_id, $file);
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
     * @return JsonResponse A JSON response indicating the status of the file deletion.
     *
     * @throws Exception If the file record with the provided ID is not found.
     */
    public static function delete(int $id, $preserve = false): JsonResponse
    {
        $query = FileRepo::find($id);
        if (!$query) {
            throw new Exception("File with ID $id not found.");
        } else {
            if ($preserve) {
                FileRepo::query()->where('id', $id)->delete();
                return response()->json(['message' => 'File deleted successfully'], 200);
            } else {
                self::deleteFile($query->path);
                FileRepo::query()->where('id', $id)->forceDelete();
                return response()->json(['message' => 'File deleted successfully'], 200);
            }
        }
    }

    /**
     * Deletes a file from storage based on the file path.
     *
     * This function deletes a file from storage based on the provided file path. If the file exists in storage,
     * it is deleted. If the file does not exist, an exception is thrown.
     *
     * @param string $path  The path to the file in storage.
     * @return JsonResponse A JSON response indicating the status of the file deletion.
     *
     */
    public static function deleteFile(string $path): JsonResponse
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['message' => 'File deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'File not found'], 404);
        }
    }

    /**
     * Retrieves file paths based on reference table and ID, optionally considering trashed records.
     *
     * This function fetches file paths associated with a given reference table name and ID. It
     * offers the flexibility to include soft-deleted records based on the provided `$trash` parameter.
     *
     * @param string $ref_table_name The name of the reference table where the file is associated.
     * @param int $ref_id            The ID of the record in the reference table.
     * @param string $trash          (default: "none") An optional parameter to control which trashed records are included:
     *                                  - "none": Returns only non-trashed records (default behavior).
     *                                  - "with": Returns both non-trashed and trashed records.
     *                                  - "only": Returns only trashed records.
     *
     * @return array An array containing file information for matching records.
     *               Each element in the array is an associative array with the following keys:
     *                  - "id": The ID of the file record.
     *                  - "path": The full path to the file relative to the public storage directory.
     *                  - "ref_name": The name of the reference table.
     *                  - "ref_id": The ID of the record in the reference table.
     *                  - "version": The version of the file.
     */
    public static function get_path_by(string $ref_table_name, int $ref_id, $trash = 'none'): array
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

        $documents = $query->get();
        $res = [];

        foreach ($documents as $document) {
            $res[] = ["id" => $document->id, "ref_name" => $document->ref_name, 'ref_id' => $document->ref_id, "path" => asset('storage/') . '/' . $document->path, 'version' => $document->version];
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
     * @return JsonResponse A JSON response indicating the status of the file restoration.
     *
     * @throws Exception If the file with the provided ID is not found or cannot be restored.
     */
    public function restore(int $id): JsonResponse
    {
        $query = FileRepo::find($id);

        if (!$query) {
            throw new Exception("File with ID $id not found.");
        }
        if (!$query->restore()) {
            throw new Exception("Failed to restore file with ID $id.");
        } else {
            return response()->json(['message' => 'File restored successfully'], 200);
        }
    }
}
