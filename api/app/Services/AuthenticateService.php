<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
                    'first_name' => $providerUser->getGivenName(),
                    'last_name'  => $providerUser->getFamilyName(),
                    'email'      => $providerUser->getEmail(),
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
