import { Gym } from "@prisma/client";
import {GymsRepository} from "@/repositories/gyms-repository";


interface IFetchNearbyGymsUseCaseRequest {
    userLatitude: number;
    userLongitude: number;
}

interface IFetchNearbyGymsUseCaseResponse {
    gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: GymsRepository) {}
    async execute({
        userLatitude,
        userLongitude
    }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse>{

        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        });

        return {
            gyms
        }
    }
}