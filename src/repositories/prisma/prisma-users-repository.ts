import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

/**
 * A class that provides methods for interacting with the users table in the database.
 */
export class PrismaUsersRepository implements UsersRepository {
    /**
     * Creates a new user in the database using the provided data.
     *
     * @param {Prisma.UserCreateInput} data - The data for creating the user.
     * @return {Promise<Prisma.User>} - A promise that resolves to the created user.
     */
    async create(data: {
        password_hash: string;
        name: string;
        email: string
    }): Promise<User> {
        // Create a new user in the database
        const user = await prisma.user.create({
            data,
        });

        return user;
    }
    /**
     * Finds a user by their email address.
     *
     * @param {string} email - The email address of the user to find.
     * @return {Promise<User | null>} - A promise that resolves to the user object if found, or null if not found.
     */
    async findByEmail(email: string) {
        // Find a user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
    /**
     * Finds a user by their ID.
     *
     * @param {string} id - The ID of the user to find.
     * @return {Promise<User | null>} - A promise that resolves to the user object if found, or null if not found.
     */
    async findById(id: string): Promise<User | null> {

        // Find a user by id
        const user = await prisma.user.findFirst({
            where: {
                id,
            },
        });

        return user;
    }


}