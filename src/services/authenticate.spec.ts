import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "@/services/authenticate";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

let sut: AuthenticateUseCase;
let usersRepository: InMemoryUserRepository;

describe("Authenticate",  () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it("should be able to authenticate the user", async () => {

        await usersRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password_hash: await hash("password", 6)
        })

        const { user } = await sut.execute({
            email: "johndoe@example.com",
            password: "password"
        });

        await expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        await expect(() => {
            return sut.execute({
                email: "johndoe@example.com",
                password: "wrong-password"
            });
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should be not able to authenticate with wrong password', async () => {

        await usersRepository.create({
            email: "johndoe@example.com",
            name: "John Doe",
            password_hash: await hash("123456", 6)
        });

        await expect(() => {
            return sut.execute({
                email: "johndoe@example.com",
                password: "wrong-password"
            });
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    });
})