<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Services\DirectoryService;
use App\Http\Requests\CreateDirectoryRequest;

class DirectoryController extends Controller
{
    /**
     * Constructor for DirectoryController.
     *
     * @param DirectoryService|null $directoryService
     */
    public function __construct(
        private ?DirectoryService $directoryService = null
    ){}

    /**
     * Create a new directory.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(CreateDirectoryRequest $request): JsonResponse
    {
        // Get directory id and data from request.
        $id = $request->id;
        $data = [
            'user_id'   => Auth::id(),
            'name'      => $request->name,
            'deletable' => true
        ];

        // Insert the new directory into the database.
        $_result = $this->directoryService->insert($id, $data);

        return response()->json([
            'directory' => $_result,
        ]);
    }

    /**
     * Update a directory.
     *
     * @param  Request  $_request
     * @return JsonResponse
     */
    public function update(Request $_request): JsonResponse
    {
        // Get directory id and data from request.
        $_id = $_request->directory['id'];
        $_data = [
            'name' => $_request->directory['name'],
        ];

        // Update the directory in the database.
        $_result = $this->directoryService->update($_id, $_data);

        return response()->json([
            'directory' => $_result,
        ]);
    }

    /**
     * Delete a directory.
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
        $_result = $this->directoryService->delete($_id);

        if (!$_result) {
            // Throw an exception if the directory was not found.
            throw new NotFoundHttpException(sprintf('The directory with ID:%s was not found.', $_id));
        }

        return response()->json([
            'result' => $_result,
        ]);
    }
}
