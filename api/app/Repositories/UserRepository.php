<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Retrieve a user based on given parameters.
     *
     * @param array $param
     * @return User|null
     */
    public function findUserByParam(array $param): ?User
    {
        return User::where($param)->first();
    }

    /**
     * Create a new user.
     *
     * @param array $param
     * @return User
     */
    public function createUser(array $param): User
    {
        return User::create($param);
    }
}
