import {expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInRespository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { GetUserMetricsUseCase } from "@/services/get-user-metrics";

let sut: GetUserMetricsUseCase;
let checkinsRepository: InMemoryCheckInRespository;


describe('Get User Metrics Service', () => {
    beforeEach(() => {
        checkinsRepository = new InMemoryCheckInRespository();
        sut = new GetUserMetricsUseCase(checkinsRepository);
    });



    it('should be able to get check-in count from metrics', async () => {
        await checkinsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });

        await checkinsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });

        const  { checkInsCount } = await sut.execute({
            userId: 'user-01',
        });

        expect(checkInsCount).toEqual(2);

    });

})

