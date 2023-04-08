<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Services\UserService;
use App\Services\DirectoryService;
use App\Services\FileService;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Constructor for HomeController.
     *
     * @param UserService|null $userService
     * @param DirectoryService|null $directoryService
     * @param FileService|null $fileService
     */
    public function __construct(
        private ?UserService $userService = null,
        private ?DirectoryService $directoryService = null,
        private ?FileService $fileService = null
    ){}

    /**
     * Home page controller
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Get the current logged-in user
        $loginUser = $this->userService->findUserByParam(['id' => Auth::id()]);

        // Get all the directories for the current user
        $directories = $this->directoryService->findDirectoriesByUserId($loginUser->id);

        // Get the selected directory ID for the current user
        $selectedDirectoryId = $this->directoryService->findSelectedDirectoryId($loginUser->id);

        // Get all the files for the selected directory
        $files = $this->fileService->findFilesByDirectoryId($selectedDirectoryId);

        // Return the user, directories, files, and selected directory ID as JSON
        return response()->json([
            'user'                => $loginUser,
            'directories'         => $directories,
            'files'               => $files,
            'selectedDirectoryId' => $selectedDirectoryId,
        ]);
    }
}
