import { FastifyReply, FastifyRequest } from "fastify";
import {makeGetUserMetricsUseCase} from "@/services/factories/make-get-user-metrics-use-case";

/**
 * metrics of checkins from user.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function history(request: FastifyRequest, reply: FastifyReply): Promise<void> {

    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    // load history of checkins from user
    const { checkInsCount } = await getUserMetricsUseCase.execute({
        userId: request.user.id,
    });



    // Return a 200 status code with an empty response
    return reply
        .status(200).send({
            checkInsCount
        });
}