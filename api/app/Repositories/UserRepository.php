<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * get user by email
     *
     * @param string $email
     * @return User
     */
    public function getUserByEmail(string $_email): ?User
    {
        return User::where("email", $_email)->first();
    }

    /**
     * create user
     *
     * @param array $_param
     * @return User
     */
    public function createUser(array $_param): User
    {
        return User::create($_param);
    }
}
