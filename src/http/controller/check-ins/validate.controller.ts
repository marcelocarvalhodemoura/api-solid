import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckinUseCase } from "@/services/factories/make-check-in-use-case";
import {makeValidadeCheckInUseCase} from "@/services/factories/make-validade-check-in-use-case";

/**
 * Validate a new check ins.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function validate(request: FastifyRequest, reply: FastifyReply): Promise<void> {

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    });


    // Parse the request params using the defined schema
    const { checkInId } = validateCheckInParamsSchema.parse(request.params);


    const validateUseCase = makeValidadeCheckInUseCase();

    // Create a new checkin from User
    await validateUseCase.execute({
        checkInId
    });



    // Return a 204 status code with an empty response
    return reply
        .status(204).send();
}