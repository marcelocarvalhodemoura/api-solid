import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import {getDistanceBetweenCoordinates} from "@/utils/get-distance-between-coordinates";
import {MaxDistanceError} from "@/services/errors/max-distance-error";
import {MaxNumberOfCheckInError} from "@/services/errors/max-number-of-check-in-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}


export class CheckinsUseCase {
    constructor(
        private checkinsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude
        }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{

        const gym = await this.gymsRepository.findById(gymId);

        if(!gym) {
            throw new ResourceNotFoundError();
        }

        // Calculate distance between user and gym
        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        );

        // Check if user is too far from gym
        const MAX_DISTANCE_IN_KILOMETERS = 0.1;
        
        if(distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError();
        }

        const checkInOnSameDate = await this.checkinsRepository.findByUserOnDate(
            userId,
            new Date()
        );

        if(checkInOnSameDate) {
            throw new MaxNumberOfCheckInError();
        }

        const checkIn = await this.checkinsRepository.create({
            gym_id: gymId,
            user_id: userId,
            created_at: new Date()
        });

        return {
            checkIn
        };
    }
}