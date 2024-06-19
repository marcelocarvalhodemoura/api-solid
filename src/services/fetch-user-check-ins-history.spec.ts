import {expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInRespository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { FetchUserCheckInsHistoryUseCase } from "@/services/fetch-user-check-ins-history";

let sut: FetchUserCheckInsHistoryUseCase;
let checkinsRepository: InMemoryCheckInRespository;


describe('Fetch User CheckIn History Service', () => {
    beforeEach(() => {
        checkinsRepository = new InMemoryCheckInRespository();
        sut = new FetchUserCheckInsHistoryUseCase(checkinsRepository);
    });



    it('should be able to fetch check-in history', async () => {
        await checkinsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });

        await checkinsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });

        const  { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1,
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: 'gym-01'}),
            expect.objectContaining({gym_id: 'gym-02'}),
        ]);
    });

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
           await checkinsRepository.create({
               gym_id: `gym-${i}`,
               user_id: 'user-01',
           });
        }

        const  { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2,
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: 'gym-21'}),
            expect.objectContaining({gym_id: 'gym-22'}),
        ]);
    });
})

