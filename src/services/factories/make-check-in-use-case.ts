import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckinsUseCase } from "@/services/check-ins";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckinUseCase() {
    const checkinsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CheckinsUseCase(checkinsRepository, gymsRepository)

    return useCase;
}