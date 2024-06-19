import { describe, it, expect, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "@/services/get-user-profile";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it('should be able to get user profile', async () => {
        const userCreated = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('password', 6)
        })

        const { user } = await sut.execute(userCreated.id);

        await expect(user.id).toEqual(expect.any(String));
        await expect(user.name).toEqual('John Doe');
    });

    it('should not be able to get user profile', async () => {
        await expect(() => {
            return sut.execute('non-existing-id');
        }).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
})