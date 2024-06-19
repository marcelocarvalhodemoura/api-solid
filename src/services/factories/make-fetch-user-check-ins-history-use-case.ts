import { GetUserMetricsUseCase } from "@/services/get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInRepository = new PrismaCheckInsRepository();
    const useCase = new GetUserMetricsUseCase(checkInRepository);

    return useCase;
}