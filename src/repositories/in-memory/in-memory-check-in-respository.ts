import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRespository implements CheckInsRepository {

    public items: CheckIn[] = [];
    /**
     * Creates a check in the database using the provided data.
     *
     * @param {Prisma.CheckInUncheckedCreateInput} data - The data for creating the check-in.
     * @return {Promise<CheckIn>} - A promise that resolves to the created check-in.
     */
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            gym_id: data.gym_id,
            user_id: data.user_id,
            validate_at: data.validate_at ? new Date(data.validate_at) : null,
            created_at: new Date(),
            updated_at: new Date()
        }

        this.items.push(checkIn);
        return checkIn;
    }

    /**
     * Saves a check-in record to the database.
     *
     * @param {CheckIn} checkIn - The check-in record to save.
     * @return {Promise<CheckIn>} - A promise that resolves to the saved check-in.
     */
    async save(checkIn: CheckIn) {
        const index = this.items.findIndex(item => item.id === checkIn.id);

        if(index >= 0) {
            this.items[index] = checkIn;
        }

        return checkIn;
    }

    /**
     * Finds a check-in by its ID.
     *
     * @param {string} id - The ID of the check-in to find.
     * @return {Promise<CheckIn | null>} - A promise that resolves to the check-in object if found, or null if not found.
     */
    async findById(id: string) {
        return this.items.find(checkIn => checkIn.id === id) || null;
    }

    /**
     * Counts the number of check-ins associated with a specific user ID.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<number>} The number of check-ins associated with the user ID.
     */
    async countByUserId(userId: string) {
        return this.items.filter(checkIn => checkIn.user_id === userId).length;
    }

    /**
     * Finds a check-in record by user ID and date.
     *
     * @param {string} userId - The ID of the user.
     * @param {Date} date - The date to search for.
     * @return {Promise<CheckIn | null>} The check-in record found, or null if none found.
     */
    async findByUserOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkOnSameDate = this.items.find(checkIn => {
            const checkInDate = dayjs(checkIn.created_at);
            const isOnSameDate =
                checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return checkIn.user_id === userId && isOnSameDate
       })

       return checkOnSameDate || null;
    }

    /**
     * Retrieves a paginated list of check-ins for a given user ID.
     *
     * @param {string} userId - The ID of the user.
     * @param {number} page - The page number of the results to retrieve.
     * @return {Promise<CheckIn[]>} A promise that resolves to an array of check-ins.
     */
    async findManyByUserId(userId: string, page: number) {
        return this.items
            .filter(checkIn => checkIn.user_id === userId)
            .slice((page - 1) * 20, (page * 20));
    }

}