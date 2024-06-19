import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "@/services/search-gyms";

export function makeSearchGymsUseCase() {
    const gymRepository = new PrismaGymsRepository();
    const useCase = new SearchGymsUseCase(gymRepository);

    return useCase;
}