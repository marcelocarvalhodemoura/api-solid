import { Gym } from "@prisma/client";
import {GymsRepository} from "@/repositories/gyms-repository";


interface ISearchGymsUseCaseRequest {
    query: string;
    page: number;
}

interface ISearchGymsUseCaseResponse {
    gyms: Gym[];
}

export class SearchGymsUseCase {
    constructor(private gymsRepository: GymsRepository) {}
    async execute({
          query,
          page
      }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse>{

        const gyms = await this.gymsRepository.searchMany(query, page);

        return {
            gyms
        }
    }
}