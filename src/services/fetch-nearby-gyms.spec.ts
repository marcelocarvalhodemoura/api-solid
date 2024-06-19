import { describe, it, expect, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "@/services/fetch-nearby-gyms";
import {InMemoryGymsRepository} from "@/repositories/in-memory/in-memory-gym-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;


describe('Fetch Nearby Gyms Use Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it('should be able to fetch nearby gyms', async () => {


        await gymsRepository.create({
            name: 'Near Gym ',
            phone: '123456789',
            description: 'Gym 1 description',
            latitude: -27.2092052,
            longitude: -49.6401091,

        });

        await gymsRepository.create({
            name: 'Far Gym',
            phone: '123456789',
            description: 'Gym 2 description',
            latitude: -27.0610928,
            longitude: -49.5229501
        });

        const { gyms } = await sut.execute({
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });
        
        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym ' })]);
    });



});