<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\DirectoryService;
use App\Services\FileService;

class FileController extends Controller
{
    /**
     * Constructor for FileController.
     *
     * @param FileService|null $fileService
     * @param DirectoryService|null $directoryService
     */
    public function __construct(
        private ?FileService $fileService = null,
        private ?DirectoryService $directoryService = null
    ) {}

    /**
     * Retrieve all files belonging to a specific directory and set that directory's ID to the session.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        // Get directory ID from request
        $id = $request->directoryId;

        // Find files by directory ID using the FileService
        $files = $this->fileService->findFilesByDirectoryId($id);

        // Set directory ID to session using the DirectoryService
        $this->directoryService->setDirectoryIdToSession($id);

        // Return JSON response with files array
        return response()->json([
            'files' => $files,
        ]);
    }

    /**
     * Save a file to the database.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Get file ID and data from request
        $id = $request->file['id'];
        $data = [
            'user_id' => $request->file['user_id'],
            'dir_id' => $request->file['dir_id'],
            'content' => $request->file['content'],
            'updated_at' => $request->file['updated_at'],
        ];

        // Save file using the FileService
        $result = $this->fileService->save($id, $data);

        // Return JSON response with result
        return response()->json([
            'result' => $result,
        ]);
    }
}
