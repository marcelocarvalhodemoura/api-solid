import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "@/services/validate-chek-in";

export function makeValidadeCheckInUseCase() {
    const checkInRepository = new PrismaCheckInsRepository();
    const useCase = new ValidateCheckInUseCase(checkInRepository);

    return useCase;
}