<?php

namespace App\Services;

use Laravel\Socialite\Contracts\User;
use Laravel\Socialite\Facades\Socialite;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;

class AuthenticateService
{
    public function __construct(
        private ?UserRepository $_userRepository = null
    ){}

    /**
     * get redirect url from repository
     *
     * @param string $provider
     *
     * @return string
     */
    public function getRedirectUrl(string $_provider): string
    {
        return Socialite::driver($_provider)->redirect()->getTargetUrl();
    }

    /**
     * OAuth認証
     *
     * @param string $provider
     * @return void
     */
    public function oAuthAuthentication(string $_provider): void
    {
        $_providerUser = Socialite::driver($_provider)->stateless()->user();
        $_user = $this->_userRepository->getUserByEmail($_providerUser->getEmail());

        if (is_null($_user)) {
            $_user = $this->_userRepository->createUser([
                'first_name' => $_providerUser["given_name"],
                'last_name'  => $_providerUser["family_name"],
                'email'      => $_providerUser["email"],
            ]);
        }

        Auth::login($_user);
        return;
    }
}
