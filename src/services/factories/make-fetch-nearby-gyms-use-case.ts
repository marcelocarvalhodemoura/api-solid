import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";import {SearchGymsUseCase} from "@/services/search-gyms";
import { FetchNearbyGymsUseCase } from "@/services/fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
    const gymRepository = new PrismaGymsRepository();
    const useCase = new FetchNearbyGymsUseCase(gymRepository);

    return useCase;
}