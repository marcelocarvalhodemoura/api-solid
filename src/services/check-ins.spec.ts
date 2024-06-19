import {expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInRespository } from "@/repositories/in-memory/in-memory-check-in-respository";
import { CheckinsUseCase } from "@/services/check-ins";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "@/services/errors/max-distance-error";
import { MaxNumberOfCheckInError } from "@/services/errors/max-number-of-check-in-error";


let sut: CheckinsUseCase;
let checkinsRepository: InMemoryCheckInRespository;
let gymsRepository: InMemoryGymsRepository;


describe('Register CheckIn Service', () => {
    beforeEach(() => {
        checkinsRepository = new InMemoryCheckInRespository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckinsUseCase(checkinsRepository, gymsRepository);

        vi.isFakeTimers();

        gymsRepository.items.push({
            id: 'gym-01',
            name: 'Gym 1',
            description: 'Gym 1 description',
            latitude: new Decimal(-27.2092052),
            longitude: new Decimal(-49.6401091),
            phone: '123456789',
            created_at: new Date(),
            updated_at: new Date(),
        });
    });

    afterEach(() => {
        vi.isFakeTimers();
    });

    it('should be to make a check in', async () => {

        const  { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-1',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should not be able to check in twice in the same day', async () => {

        const  { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInError);

    });

    it('should be able to check in on different days', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));
        const  { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should not be able to check in distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            name: 'Gym 2',
            description: 'Gym 2 description',
            latitude: new Decimal(-27.0747279),
            longitude: new Decimal(-49.4889672),
            phone: '51995715143',
            created_at: new Date(),
            updated_at: new Date(),
        });

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })).rejects.toBeInstanceOf(MaxDistanceError);
    });

    it('should not be able to ckeck in ')

})

