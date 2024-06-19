import { expect, it, describe, beforeEach, afterEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { CreateGymUseCase} from "./create-gym";

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Service', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymRepository);
    });

    // afterEach(() => {
    //     gymRepository = null;
    //     sut = null;
    // });

    it('should be able to create a gym', async () => {
        const { gym } = await sut.execute({
            name: 'Gym 1',
            phone: '123456789',
            description: 'Gym 1 description',
            latitude: -27.2092052,
            longitude: -49.6401091
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});