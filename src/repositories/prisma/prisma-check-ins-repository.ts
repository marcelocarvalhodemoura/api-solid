import {CheckInsRepository} from "@/repositories/check-ins-repository";
import {CheckIn, Prisma} from "@prisma/client";
import {prisma} from "@/lib/prisma";
import dayjs from "dayjs";



export class PrismaCheckInsRepository implements CheckInsRepository {
    /**
     * Counts the number of check-ins associated with a specific user ID.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<number>} The number of check-ins associated with the user ID.
     */
    async countByUserId(userId: string): Promise<number> {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId,
            },
        });

        return count;
    }

    /**
     * Finds a check-in by its ID.
     *
     * @param {string} id - The ID of the check-in to find.
     * @return {Promise<CheckIn | null>} - A promise that resolves to the check-in object if found, or null if not found.
     */
    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id,
            },
        });

        return checkIn;
    }

    /**
     * Finds a check-in record by user ID and date.
     *
     * @param {string} userId - The ID of the user.
     * @param {Date} date - The date to search for.
     * @return {Promise<CheckIn | null>} The check-in record found, or null if none found.
     */
    async findByUserOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lt: endOfTheDay.toDate(),
                },
            },
        });

        return checkIn;
    }

    /**
     * Retrieves multiple check-ins associated with a specific user ID.
     *
     * @param {string} userId - The ID of the user.
     * @param {number} page - The page number to retrieve.
     * @return {Promise<CheckIn[]>} A promise that resolves to an array of check-ins.
     */
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId,
            },
            take: 20,
            skip: (page - 1) * 20,
        });

        return checkIns;
    }

    /**
     * Creates a new check-in in the database using the provided data.
     *
     * @param {Prisma.CheckInCreateInput} data - The data for creating the check-in.
     * @return {Promise<CheckIn>} - A promise that resolves to the created check-in.
     */
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data,
        });

        return checkIn;
    }

    /**
     * Saves the given check-in by updating it in the database.
     *
     * @param {CheckIn} checkIn - The check-in object to be saved.
     * @return {Promise<CheckIn>} - A promise that resolves to the updated check-in object.
     */
    async save(checkIn: CheckIn): Promise<CheckIn> {
        const updatedCheckIn = await prisma.checkIn.update({
            where: {
                id: checkIn.id,
            },
            data: checkIn,
        });

        return updatedCheckIn;
    }

}