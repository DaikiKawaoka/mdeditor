<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use App\Repositories\UserRepository;
use App\Repositories\DirectoryRepository;
use App\Models\Directory;

class AuthenticateService
{
    /**
     * Constructor for AuthenticateService.
     *
     * @param UserRepository|null $userRepository
     * @param DirectoryRepository|null $directoryRepository
     * @param Directory|null $directoryModel
     */
    public function __construct(
        private ?UserRepository $userRepository = null,
        private ?DirectoryRepository $directoryRepository = null,
        private ?Directory $directoryModel = null
    ){}

    /**
     * Get the redirect URL for the given provider.
     *
     * @param string $provider
     * @return string
     */
    public function getRedirectUrl(string $provider): string
    {
        return Socialite::driver($provider)->redirect()->getTargetUrl();
    }

    /**
     * Authenticate the user via OAuth.
     *
     * @param string $provider
     * @throws \Exception
     * @return void
     */
    public function oAuthAuthentication(string $provider): void
    {
        try {
            DB::beginTransaction();

            $providerUser = Socialite::driver($provider)->stateless()->user();
            $user = $this->userRepository->findUserByParam(['email' => $providerUser->getEmail()]);

            if (is_null($user)) {
                $user = $this->userRepository->createUser([
                    'first_name' => $providerUser->user['given_name'],
                    'last_name'  => $providerUser->user['family_name'],
                    'email'      => $providerUser->user['email'],
                ]);

                $this->directoryRepository->save(
                    $this->directoryModel,
                    [
                        'user_id'   => $user->id,
                        'name'      => config('mdEditor.defaultDirectoryName'),
                        'deletable' => false
                    ]
                );
            }
            DB::commit();

            Auth::login($user);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Authenticate the user via sign up.
     *
     * @param string $provider
     * @throws \Exception
     * @return void
     */
    public function signUp(array $data): void
    {
        try {
            DB::beginTransaction();

            $user = $this->userRepository->createUser([
                'first_name' => $data['first_name'],
                'last_name'  => $data['last_name'],
                'email'      => $data['email'],
                'password'   => Hash::make($data['password'])
            ]);

            $this->directoryRepository->save(
                $this->directoryModel,
                [
                    'user_id'   => $user->id,
                    'name'      => config('mdEditor.defaultDirectoryName'),
                    'deletable' => false
                ]
            );

            DB::commit();

            Auth::login($user);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Authenticate user with form
     *
     * @param array $credentials
     * @param boolean|null $remember
     * @return bool
     */
    public function formAuthentication(array $credentials, bool|null $remember): bool
    {
        return Auth::attempt($credentials, $remember);
    }

    /**
     * Sign the user out of the application.
     *
     * @param  Request  $request
     * @return void
     */
    public function signOut(Request $request): void
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
