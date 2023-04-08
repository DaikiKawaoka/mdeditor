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
        // If $id is provided, get the existing file, otherwise create a new file
        if ($id) {
            $file = $this->fileRepository->findFileById($id);
        } else {
            $file = $this->fileModel;
        }

        // Save the file
        return $this->fileRepository->save($file, $data);
    }
}
