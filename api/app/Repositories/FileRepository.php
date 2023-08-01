<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use App\Models\File;

class FileRepository
{
    /**
     * Creates a new instance of FileRepository.
     *
     * @param File|null $_fileModel
     */
    public function __construct(private ?File $_fileModel = null)
    {
    }

    /**
     * Finds files by directory ID.
     *
     * @param int $directoryId
     * @return Collection
     */
    public function findFilesByDirectoryId(int $directoryId) : Collection
    {
        return $this->_fileModel::where('dir_id', $directoryId)->orderByDesc('updated_at')->get();
    }

    /**
     * Finds a file by ID.
     *
     * @param int $id
     * @return File|null
     */
    public function findFileById(int $id) : File|null
    {
        return $this->_fileModel::find($id);
    }

    /**
     * Saves a file.
     *
     * @param File $file
     * @param array $data
     * @return int
     */
    public function save(File $file, array $data) : int
    {
        $file->fill($data)->save();
        return $file->id;
    }

    /**
     * Deletes a file.
     *
     * @param File $file
     * @param array $data
     * @return bool
     */
    public function delete(File $file) : bool
    {
        return $file->delete();
    }
}
