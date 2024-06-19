import { Gym } from "@prisma/client";
import {GymsRepository} from "@/repositories/gyms-repository";


interface ICreateGymUseCase {
    name: string;
    phone: string;
    description: string;
    latitude: number;
    longitude: number;
}

interface ICreateGymUseCaseResponse {
    gym: Gym;
}

export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) {}
    async execute({
      name,
      phone,
      description,
      latitude,
      longitude
    }: ICreateGymUseCase): Promise<ICreateGymUseCaseResponse>{

        const gym = await this.gymsRepository.create({
            name,
            phone,
            description,
            latitude,
            longitude
        });

        return {
            gym
        };
    }
}