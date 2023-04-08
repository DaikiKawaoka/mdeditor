<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Directory;

class DirectoryRepository
{
    /**
     * Get the directory by the specified ID.
     *
     * @param int $id
     * @return Directory|null
     */
    public function findDirectoryById(int $id) : ?Directory
    {
        return Directory::find($id);
    }

    /**
     * Get all the directories for the specified user.
     *
     * @param int $userId
     * @return Collection
     */
    public function findDirectoriesByUserId(int $userId) : Collection
    {
        return Directory::where('user_id', $userId)->get();
    }

    /**
     * Get the ID of the first directory for the specified user.
     *
     * @param int $userId
     * @return int
     */
    public function findFirstDirectoryIdByUserId(int $userId) : int
    {
        $_directory = Directory::select('id')->where('user_id', $userId)->first();
        return $_directory->id;
    }

    /**
     * Check if the specified user has the specified directory.
     *
     * @param int $directoryId
     * @param int $userId
     * @return bool
     */
    public function hasDirectoryId(int $directoryId, int $userId) : bool
    {
        return (bool) Directory::select('id')->where(['id' => $directoryId, 'user_id' => $userId])->first();
    }

    /**
     * Save the directory.
     *
     * @param Directory $directory
     * @param array $data
     * @return Directory
     */
    public function save(Directory $directory, array $data) : Directory
    {
        $directory->fill($data)->save();
        return $directory;
    }

    /**
     * Delete the directory.
     *
     * @param Directory $directory
     * @return bool
     */
    public function delete(Directory $directory) : bool
    {
        return $directory->delete();
    }
}
