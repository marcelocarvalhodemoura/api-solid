import {UsersRepository} from "@/repositories/users-repository";
import { randomUUID } from "node:crypto";
import {User} from "@prisma/client";

export class InMemoryUserRepository implements UsersRepository {

    public items: User[] = [];
    /**
     * Creates a new user in the database using the provided data.
     *
     * @param {Prisma.UserCreateInput} data - The data for creating the user.
     * @return {Promise<User>} - A promise that resolves to the created user.
     */
    async create(data: { password_hash: string; name: string; email: string }): Promise<User> {
        const user = {
            id: randomUUID(),
            name: data.name ? data.name : 'John Doe',
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
            updated_at: new Date(),
        }

        this.items.push(user);
        return user;
    }
    /**
     * Finds a user by their email address.
     *
     * @param {string} email - The email address of the user to find.
     * @return {Promise<User | null>} - A promise that resolves to the user object if found, or null if not found.
     */
    async findByEmail(email:string) {
        const user =  this.items.find((item) => item.email === email);

        if(!user) {
            return null;
        }

        return user;
    }

    /**
     * Finds a user by their ID.
     *
     * @param {string} id - The ID of the user to find.
     * @return {Promise<User | null>} - A promise that resolves to the user object if found, or null if not found.
     */
    findById(id: string): Promise<User | null> {
        return Promise.resolve(this.items.find(user => user.id === id) || null);
    }


}