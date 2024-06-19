import { prisma } from "@/lib/prisma";
import {Gym, Prisma} from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";


export class PrismaGymsRepository implements GymsRepository {
    /**
     * Creates a new gym in the database with the provided data.
     *
     * @param data - The data for creating the gym.
     * @returns A promise that resolves to the created gym.
     */
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        // Create a new gym in the database
        const gym = await prisma.gym.create({
            data,
        });

        return gym;
    }

    /**
     * Finds a gym by its ID.
     *
     * @param {string} id - The ID of the gym to find.
     * @return {Promise<Gym | null>} - A promise that resolves to the gym object if found, or null if not found.
     */
    async findById(id: string) {
        // Find a user by id
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        });

        return gym;
    }

    findManyNearby(params: { latitude: number; longitude: number; }): Promise<Gym[]> {
        const { latitude, longitude } = params;
        return prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms 
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) < 10
            `
        
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
            skip: (page - 1) * 20,
            take: 20,
        });

        return gyms;
    }

}