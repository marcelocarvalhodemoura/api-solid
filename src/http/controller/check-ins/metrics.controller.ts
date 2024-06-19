import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {makeFetchUserCheckInsHistoryUseCase} from "@/services/factories/make-fetch-user-check-ins-history-use-case";

/**
 * history of checkins from user.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function metrics(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define the shape of the request body
    const historyCheckInsQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    // Parse the request body using the defined schema
    const {  page } = historyCheckInsQuerySchema.parse(request.query);


    const fecthUserCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

    // load history of checkins from user
    const { checkInsCount } = await fecthUserCheckInHistoryUseCase.execute({
        userId: request.user.id,
    });



    // Return a 200 status code with an empty response
    return reply
        .status(200).send({
            checkInsCount
        });
}