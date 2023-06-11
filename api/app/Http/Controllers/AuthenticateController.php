<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Services\AuthenticateService;
use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;

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
     * @return JsonResponse
     */
    public function handleGoogleCallback(): JsonResponse
    {
        $this->authenticateService->oAuthAuthentication(config('mdEditor.provider.google'));

        return response()->json(true);
    }

    /**
     *
     *
     * @return JsonResponse
     */
    public function signIn(SignInRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');
        $result = $this->authenticateService->formAuthentication($credentials, $request->remember);

        if (!$result) {
            return response()->json($result, Response::HTTP_UNAUTHORIZED);
        }
        return response()->json($result);
    }

    /**
     *
     *
     * @return JsonResponse
     */
    public function signUp(SignUpRequest $request): JsonResponse
    {
        $data = [
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'      => $request->email,
            'password'   => $request->password,
        ];
        $result = $this->authenticateService->signUp($data);

        return response()->json($result);
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
