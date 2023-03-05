<?php

namespace App\Http\Controllers;

use App\Services\AuthenticateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class AuthenticateController extends Controller
{
    public function __construct(
        private ?AuthenticateService $_authenticateService = null
    ){}

    /**
     * function returning redirect url of other service
     *
     * @return JsonResponse
     */
    public function redirectToGoogle(): JsonResponse
    {
        return response()->json([
            'redirect_url' => $this->_authenticateService->getRedirectUrl(config('mdEditor.provider.google'))
        ]);
    }

    /**
     * function logging in to this app with google
     *
     * @return RedirectResponse
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        $this->_authenticateService->oAuthAuthentication(config('mdEditor.provider.google'));
        return redirect("/");
    }
}
