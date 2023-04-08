<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use App\Services\AuthenticateService;

class AuthenticateController extends Controller
{
    /**
     * Constructor for AuthenticateController.
     *
     * @param AuthenticateService|null $authenticateService
     */
    public function __construct(
        private ?AuthenticateService $authenticateService = null
    ){}

    /**
     * Redirect the user to the Google authentication page.
     *
     * @return JsonResponse The JSON response containing the redirect URL for Google authentication.
     */
    public function redirectToGoogle(): JsonResponse
    {
        $redirectUrl = $this->authenticateService->getRedirectUrl(config('mdEditor.provider.google'));

        return response()->json([
            'redirect_url' => $redirectUrl
        ]);
    }

    /**
     * Handle the callback from Google authentication.
     *
     * @return RedirectResponse The redirect response to the homepage.
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        $this->authenticateService->oAuthAuthentication(config('mdEditor.provider.google'));

        return redirect("/");
    }

    /**
     * Sign out the user.
     *
     * @param Request $request The HTTP request object.
     *
     * @return JsonResponse The JSON response indicating success.
     */
    public function signOut(Request $request): JsonResponse
    {
        $this->authenticateService->signOut($request);

        return response()->json(true);
    }
}
