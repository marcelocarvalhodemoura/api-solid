import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

interface GetUserProfileResponse {
    user: User;
}

export class GetUserProfileUseCase {
    constructor (
        private usersRepository: UsersRepository
    ) {}

    async execute(userId: string): Promise<GetUserProfileResponse> {

        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }
        return {
            user,
        };
    }
}