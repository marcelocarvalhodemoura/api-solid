import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { User } from "@prisma/client";


interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseRespose {
    user: User;
}

export class AuthenticateUseCase {
    constructor (
        private userRepository: UsersRepository
    ) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseRespose>{
        // Find the user by email
        const user = await this.userRepository.findByEmail(email);

        // Check if the user was found
        if (!user) {
            throw new InvalidCredentialsError()
        }

        // Check if the password is correct
        const doesPasswordMatches = await compare(password, user.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return {
            user,
        };
    }
}