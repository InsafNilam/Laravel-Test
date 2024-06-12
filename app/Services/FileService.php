<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use InvalidArgumentException;

class FileService
{
    private $fileManagerService;
    private static $instance;

    /**
     * Get the instance of the FileService class.
     *
     * This method returns the instance of the FileService class.
     * If the instance does not exist, it creates a new instance and returns it.
     *
     * @param FileManager|null $fileManager The file manager service.
     * @return FileService Returns the instance of the FileService class.
     */
    public static function getInstance(FileManager $fileManager = null)
    {
        if (is_null(self::$instance)) {
            if (is_null($fileManager)) {
                $fileManager = new FileManager();
            }
            self::$instance = new self($fileManager);
        }
        return self::$instance;
    }

    // Prevent the instance from being cloned
    private function __construct(FileManager $fileManager)
    {
        $this->fileManagerService = $fileManager;
    }

    /**
     * Uploads a file to storage.
     *
     * This method is responsible for uploading a file to the storage system.
     * It takes care of handling the file upload process and storing the file in the appropriate location.
     *
     * @param string $folder The folder where the file is stored.
     * @param int $ref_id    The ID of the record in the reference table.
     * @return JsonResponse  JSON Response of the path of the uploaded file and file.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function upload($folder, $ref_id, $file): JsonResponse
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }
        $file = $this->fileManagerService->upload($folder, $ref_id, $file);

        return response()->json(["path" => asset('storage/') . '/' . $file->path, "file" => $file]);
    }

    /**
     * Retrieves the path of the latest version of a file in a specified folder.
     *
     * This method first calls the `get_path_by` method of the `fileManagerService` with the provided folder and ID.
     * It then initializes a variable to hold the latest version of the file.
     *
     * The method then loops through the array of files returned by `get_path_by`.
     * For each file, it extracts the numeric part from the version string using a regular expression.
     * If the `latestVersion` variable is null or the current file's version is greater than the latest version,
     * it updates the `latestVersion` variable with the current file.
     *
     * Finally, the method returns the path of the latest version of the file.
     *
     * @param string $folder  The name of the folder where the file is located.
     * @param int $ref_id     The ID of the record in the reference table.
     * @return JsonResponse   returns the attributes of the latest version of the file.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function get($folder, $ref_id, $trash = 'none'): JsonResponse
    {
        $fileArray = self::getAll($folder, $ref_id, $trash);
        $latestVersion = null;
        foreach ($fileArray as $file) {
            $fileVersion = $file['version'];
            if ($latestVersion === null || strnatcmp($fileVersion, $latestVersion['version']) > 0) {
                $latestVersion = $file;
            }
        }

        return $latestVersion;
    }

    /**
     * Retrieves all files from a specified folder in storage.
     *
     * This method is responsible for fetching all files that are stored in a specific folder within the storage system.
     * The folder is identified by the provided $folder parameter.
     *
     * The method returns an array of files. Each file in the array is represented as an associative array containing
     * the file's properties, such as its id, path
     *
     * @param string $folder The path of the folder within the storage system from which to retrieve files.
     * @param int $ref_id    The ID of the record in the reference table.
     * @return array         An array of associative arrays, each representing a file in the specified folder. If $id is provided, the array may contain a single file.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function getAll($folder, $ref_id, $trash = 'none'): array
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }

        return $this->fileManagerService->get_path_by($folder, $ref_id, $trash);
    }

    /**
     * Delete file from storage
     *
     * This method is responsible for deleting a file from the storage.
     * It performs the necessary operations to delete the file and returns
     * true if the file was successfully deleted.
     *
     * @param string $folder The folder where the file is stored.
     * @param int $ref_id    The ID of the record in the reference table.
     * @return JsonResponse  Returns a JSON response indicating the status of the file deletion.
     *
     *  @throws InvalidArgumentException If the required arguments are missing.
     */
    public function deleteAll($folder, $ref_id, $preserve = false): JsonResponse
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }
        $files = $this->getAll($folder, $ref_id);
        foreach ($files as $file) {
            if (is_array($file)) {
                $this->fileManagerService->delete($file['id'], $preserve);
            }
        }
        return response()->json(["message" => "Files deleted successfully"], 200);
    }

    /**
     * Delete file from storage
     *
     * This method is responsible for deleting a file from the storage.
     * It performs the necessary operations to delete the file and returns
     * true if the file was successfully deleted.
     *
     * @param int $id        The ID of the file to be deleted.
     * @param bool $preserve (default: false) Whether to preserve the file in storage.
     * @return JsonResponse  Returns a JSON response indicating the status of the file deletion.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function delete($id, $preserve = false): JsonResponse
    {
        if ($id == null) {
            throw new InvalidArgumentException('Missing required arguments: ID is required to delete a file association.');
        }

        return $this->fileManagerService->delete($id, $preserve);
    }

    /**
     * Delete file from storage
     *
     * This method is responsible for deleting a file from the storage.
     * It performs the necessary operations to delete the file and returns
     * true if the file was successfully deleted.
     *
     * @param int $id       The ID of the file to be deleted.
     * @return JsonResponse Returns a JSON response indicating the status of the file deletion.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function deleteFile(string $path): JsonResponse
    {
        if ($path == null) {
            throw new InvalidArgumentException('Missing required arguments: Path is required to delete a file association.');
        }
        return $this->fileManagerService->deleteFile($path);
    }

    /**
     * Update file in storage
     *
     * This method is responsible for updating a file in the storage.
     * It performs the necessary operations to update the file and returns
     * the path value of the updated file.
     *
     * @param string $folder The folder where the file is stored.
     * @param int $ref_id    The ID of the record in the reference table.
     * @param mixed $file    The updated file.
     * @param bool $preserve (default: false) Whether to preserve the file in storage.
     * @return JsonResponse  Returns the path of the updated file.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function update($folder, $ref_id, $file = null, $preserve = false): JsonResponse
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }

        $file = $this->fileManagerService->update($folder, $ref_id, $file, $preserve);
        return response()->json(["path" => asset('storage/') . '/' . $file->path, "file" => $file]);
    }

    /**
     * Restore file from trash
     *
     * This method is responsible for restoring a file from the trash.
     * It performs the necessary operations to restore the file and returns
     * true if the file was successfully restored.
     *
     * @param string $folder The folder where the file is stored.
     * @param int $ref_id    The ID of the record in the reference table.
     * @return JsonResponse  Returns a JSON response indicating the status of the file restoration.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */

    public function restore($folder, $ref_id): JsonResponse
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }
        $files = $this->getAll($folder, $ref_id, 'only');
        foreach ($files as $file) {
            if (is_array($file)) {
                $this->fileManagerService->restore($file['id']);
            }
        }
        return response()->json(["message" => "Files restored successfully"], 200);
    }
}
