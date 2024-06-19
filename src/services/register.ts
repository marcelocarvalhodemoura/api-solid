import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";


interface IRegisterUseCase {
    name: string;
    email: string;
    password: string;
}

interface IRegisterUseCaseResponse {
    user: User;
}

export class RegisterUseCase {
    constructor(private userRepository: UsersRepository) {}
    async execute({name, email, password}: IRegisterUseCase): Promise<IRegisterUseCaseResponse>{
        // Hash the password
        const hashedPassword = await hash( password, 6);

        // Check if a user with the given email already exists
        const userExists = await this.userRepository.findByEmail(email);


        if (userExists) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.userRepository.create({
            name,
            email,
            password_hash: hashedPassword
        });

        return {
            user
        };
    }
}