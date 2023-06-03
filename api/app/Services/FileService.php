<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;

use App\Repositories\FileRepository;
use App\Models\File;

class FileService
{
    /**
     * Constructor for FileService.
     *
     * @param FileRepository|null $fileRepository File repository object.
     * @param File|null $fileModel File model object.
     */
    public function __construct(
        private ?FileRepository $fileRepository = null,
        private ?File $fileModel = null
    ){}

    /**
     * Get collection of files by directory ID.
     *
     * @param int $directoryId Directory ID.
     * @return Collection
     */
    public function findFilesByDirectoryId(int $directoryId) :Collection
    {
        return $this->fileRepository->findFilesByDirectoryId($directoryId);
    }

    /**
     * Save a file.
     *
     * @param int $id File ID.
     * @param array $data File data.
     * @return bool
     */
    public function save(int $id, array $data) :bool
    {
        // Find the file by ID or create a new file object
        $file = $this->fileRepository->findFileById($id);
        if (is_null($file)) {
            $file = $this->fileModel;
        }

        // Save the file
        return $this->fileRepository->save($file, $data);
    }

    /**
     * Delete a file
     *
     * @param int|null $id
     * @return bool
     */
    public function delete(?int $id): bool
    {
        if (!$id) {
            return false;
        }

        $file = $this->fileRepository->findFileById($id);

        if (is_null($file)) {
            return false;
        }

        return $this->fileRepository->delete($file);
    }
}
