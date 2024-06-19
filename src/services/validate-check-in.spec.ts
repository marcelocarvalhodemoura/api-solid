import {expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInRespository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { ValidateCheckInUseCase } from "@/services/validate-chek-in";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let sut: ValidateCheckInUseCase;
let checkinsRepository: InMemoryCheckInRespository;


describe('Register CheckIn Service', () => {
    beforeEach(() => {
        checkinsRepository = new InMemoryCheckInRespository();

        sut = new ValidateCheckInUseCase(checkinsRepository);

        vi.isFakeTimers();

    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be to validate the check-in', async () => {

        const createdCheckIn = await checkinsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        });

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        })

        expect(checkIn.validate_at).toEqual(expect.any(Date));
        expect(checkinsRepository.items[0].validate_at).toEqual(expect.any(Date));
    });

    it('should not be to validate the check-in inexistent', async () => {

        await expect(() =>
            sut.execute({checkInId: 'inexistent-id'})
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should be not to validate the check-in after 20 minutes of this creation', async () => {
        vi.setSystemTime(new Date(2024, 0, 1, 13, 40, 0));

        const createdCheckIn = await checkinsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        });

        vi.setSystemTime(new Date(2024, 0, 1, 14, 20, 0));

        await expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id
            })
        ).rejects.toBeInstanceOf(Error);
    });

})

