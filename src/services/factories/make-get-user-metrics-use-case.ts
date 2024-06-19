import { GetUserMetricsUseCase } from "@/services/get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsUseCase() {
    const checkinsRepository = new PrismaCheckInsRepository();
    const useCase = new GetUserMetricsUseCase(checkinsRepository);

    return useCase;
}