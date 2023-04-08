<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Models\User;

class UserService
{
    /**
     * Constructor for UserService.
     *
     * @param UserRepository|null $userRepository User repository object
     */
    public function __construct(
        private ?UserRepository $userRepository = null
    ){}

    /**
     * Method to find a user based on given parameters
     *
     * @param array $param Array of parameters to search for
     * @return User|null
     */
    public function findUserByParam(array $param) :?User
    {
        return $this->userRepository->findUserByParam($param);
    }
}