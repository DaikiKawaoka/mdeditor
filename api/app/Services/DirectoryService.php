<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;
use App\Repositories\DirectoryRepository;
use App\Models\Directory;

class DirectoryService
{
    /**
     * Constructor for DirectoryService.
     *
     * @param DirectoryRepository|null $directoryRepository
     * @param Directory|null $directoryModel
     */
    public function __construct(
        private ?DirectoryRepository $directoryRepository = null,
        private ?Directory $directoryModel = null
    ){}

    /**
     * Get directories owned by a user
     *
     * @param int $userId
     * @return Collection
     */
    public function findDirectoriesByUserId(int $userId): Collection
    {
        return $this->directoryRepository->findDirectoriesByUserId($userId);
    }

    /**
     * Get the directory ID selected by the user
     * If it does not exist or is invalid, retrieve the first directory
     *
     * @param int $userId
     * @return int
     */
    public function findSelectedDirectoryId(int $userId): int
    {
        $selectedDirectoryId = session()->get('selectedDirectoryId');

        // Retrieve the first directory if the selectedDirectoryId is invalid
        if (!$selectedDirectoryId || !is_int($selectedDirectoryId) || !$this->directoryRepository->hasDirectoryId($selectedDirectoryId, $userId)) {
            $selectedDirectoryId = $this->directoryRepository->findFirstDirectoryIdByUserId($userId);
        }

        $this->setDirectoryIdToSession($selectedDirectoryId);

        return $selectedDirectoryId;
    }

    /**
     * Save directory ID to session
     *
     * @param int $id
     * @return void
     */
    public function setDirectoryIdToSession(int $id): void
    {
        session()->put('selectedDirectoryId', $id);
    }

    /**
     * Create a new directory
     *
     * @param int $id
     * @param array $data
     * @return Directory|false
     */
    public function insert(int $id, array $data): Directory|false
    {
        $directory = $this->directoryRepository->findDirectoryById($id);

        // Return false if the directory already exists
        if (!is_null($directory)) {
            return false;
        }

        return $this->directoryRepository->save($this->directoryModel, $data);
    }

    /**
     * Update directory information
     *
     * @param int $id
     * @param array $data
     * @return Directory|false
     */
    public function update(int $id, array $data): Directory|false
    {
        if (!$id) {
            return false;
        }

        $directory = $this->directoryRepository->findDirectoryById($id);

        // Return false if the directory does not exist
        if (is_null($directory)) {
            return false;
        }

        return $this->directoryRepository->save($directory, $data);
    }

    /**
     * Delete a directory
     *
     * @param int|null $id
     * @return bool
     */
    public function delete(?int $id): bool
    {
        if (!$id)
            return false;

        $directory = $this->directoryRepository->findDirectoryById($id);

        // Return false if the directory cannot be deleted
        if (is_null($directory) || !$directory->deletable)
            return false;

        return $this->directoryRepository->delete($directory);
    }
}
