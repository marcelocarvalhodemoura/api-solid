import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "@/services/register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError} from "@/services/errors/user-already-exists";

let sut: RegisterUseCase;
let usersRepository: InMemoryUserRepository;

describe('Register Service', () => {
    beforeEach(() => {
      usersRepository = new InMemoryUserRepository();
      sut = new RegisterUseCase(usersRepository);
    });

    it('should be hash user password upon registration', async () => {

      const  { user } = await sut.execute({
        name: 'John Doe',
        email: 'p2HrF@example.com',
        password: '123456',
      })

      const isPasswordCorrectlyHashed = await compare(
          '123456',
          user.password_hash
      )

        await expect(isPasswordCorrectlyHashed).toBe(true)

    });

    it('should throw an error if the user already exists', async () => {

      await sut.execute({
        name: 'John Doe',
        email: 'p2HrF@example.com',
        password: '123456',
      });

      await expect(() => {
        return sut.execute({
          name: 'John Doe',
          email: 'p2HrF@example.com',
          password: '123456',
        });
      }).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });

    it('should return the created user', async () => {

      const { user } = await sut.execute({
        name: 'John Doe',
        email: 'p2HrF@example.com',
        password: '123456',
      });

      await expect(user.id).toEqual(expect.any(String));
    });
})

