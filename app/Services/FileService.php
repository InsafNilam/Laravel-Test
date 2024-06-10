<?php

namespace App\Services;

use Exception;
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
     * @param int $ref_id The ID of the record in the reference table.
     * @return string Returns the path of the uploaded file.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function upload($folder, $ref_id, $file)
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }
        $this->fileManagerService->upload($folder, $ref_id, $file);
        return $this->get($folder, $ref_id);
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
     * @param string $folder The name of the folder where the file is located.
     * @param int $ref_id     The ID of the record in the reference table.
     * @return string        The path of the latest version of the file.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function get($folder, $ref_id, $trash = 'none')
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }
        $fileArray = $this->fileManagerService->get_path_by($folder, $ref_id, $trash);
        $latestVersion = null;
        foreach ($fileArray as $file) {
            // Extract the numeric part from the version string using regular expression
            $fileVersion = (int) preg_replace('/[^0-9.]/', '', $file['version']);
            if ($latestVersion === null || version_compare($fileVersion, $latestVersion, '>')) {
                $latestVersion = $file;
            }
        }
        return $latestVersion['path'];
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
     * @param int $ref_id The ID of the record in the reference table.
     * @return array An array of associative arrays, each representing a file in the specified folder. If $id is provided, the array may contain a single file.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function getAll($folder, $ref_id, $trash = 'none')
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
     * @param int $ref_id The ID of the record in the reference table.
     * @return bool Returns true if the file was successfully deleted.
     *
     *  @throws InvalidArgumentException If the required arguments are missing.
     */
    public function delete($folder, $ref_id, $preserve = false)
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
        return true;
    }

    /**
     * Update file in storage
     *
     * This method is responsible for updating a file in the storage.
     * It performs the necessary operations to update the file and returns
     * the path value of the updated file.
     *
     * @param string $folder The folder where the file is stored.
     * @param int $ref_id The ID of the record in the reference table.
     * @param mixed $file The updated file.
     * @param bool $preserve (default: false) Whether to preserve the file in storage.
     * @return string Returns the path of the updated file if it was successfully updated.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */
    public function update($folder, $ref_id, $file = null, $preserve = false)
    {
        if ($ref_id == null || $folder == null) {
            throw new InvalidArgumentException('Missing required arguments: Reference ID and folder are both required to update a file association.');
        }
        $this->fileManagerService->update($folder, $ref_id, $file, $preserve);
        return $this->get($folder, $ref_id);
    }

    /**
     * Restore file from trash
     *
     * This method is responsible for restoring a file from the trash.
     * It performs the necessary operations to restore the file and returns
     * true if the file was successfully restored.
     *
     * @param string $folder The folder where the file is stored.
     * @param int $ref_id The ID of the record in the reference table.
     * @return bool Returns true if the file was successfully restored.
     *
     * @throws InvalidArgumentException If the required arguments are missing.
     */

    public function restore($folder, $ref_id)
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
        return true;
    }
}