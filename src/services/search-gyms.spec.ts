import {expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInRespository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { FetchUserCheckInsHistoryUseCase } from "@/services/fetch-user-check-ins-history";
import {SearchGymsUseCase} from "@/services/search-gyms";
import {InMemoryGymsRepository} from "@/repositories/in-memory/in-memory-gym-repository";

let sut: SearchGymsUseCase;
let gymsRepository: InMemoryGymsRepository;


describe('Search Gyms Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);
    });

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            id: 'gym-01',
            name: 'Gym 1',
            phone: '123456789',
            description: 'Gym 1 description',
            latitude: -27.2092052,
            longitude: -49.6401091
        });

        await gymsRepository.create({
            id: 'gym-02',
            name: 'Gym 2',
            phone: '123456789',
            description: 'Gym 2 description',
            latitude: -27.2092052,
            longitude: -49.6401091
        });

        const { gyms } = await sut.execute({
            query: 'Gym 1',
            page: 1,
        });


        expect(gyms).toHaveLength(1);
        expect(gyms[0].name).toEqual('Gym 1');
    });

    it('should be able to search for gyms with pagination', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                id: `gym-${i}`,
                name: `Gym ${i}`,
                phone: '123456789',
                description: 'Gym 1 description',
                latitude: -27.2092052,
                longitude: -49.6401091
            });
        }

        const { gyms } = await sut.execute({
            query: 'Gym',
            page: 2,
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ name: 'Gym 21' }),
            expect.objectContaining({ name: 'Gym 22' }),
        ]);
    })

})

