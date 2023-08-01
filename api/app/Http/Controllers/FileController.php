<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\DirectoryService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
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

        if (!$data['content']) {
            $result = $this->fileService->delete($id);
            $type = 'delete';
        } else {
            $result = $this->fileService->save($id, $data);
            $type = 'save';
        }

        // Return JSON response with result
        return response()->json([
            'result' => $result,
            'type' => $type
        ]);
    }

    /**
     * Delete a file to the database.
     *
     * @param  Request  $_request
     * @return JsonResponse
     *
     * @throws NotFoundHttpException
     */
    public function destroy(Request $_request): JsonResponse
    {
        // Get directory id from request.
        $_id = $_request->input('id');

        // Delete the directory from the database.
        $_result = $this->fileService->delete($_id);

        if (!$_result) {
            // Throw an exception if the directory was not found.
            throw new NotFoundHttpException(sprintf('The directory with ID:%s was not found.', $_id));
        }

        return response()->json([
            'result' => $_result,
        ]);
    }
}
