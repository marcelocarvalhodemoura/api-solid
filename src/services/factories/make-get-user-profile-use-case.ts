import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "@/services/get-user-profile";

export function makeGetUserProfileUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new GetUserProfileUseCase(usersRepository);

    return useCase;
}