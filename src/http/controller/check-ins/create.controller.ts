import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {makeCheckinUseCase} from "@/services/factories/make-check-in-use-case";

/**
 * Registers a new check ins.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define the shape of the request body
    const createCheckInBodySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        })
    });

    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    });

    // Parse the request body using the defined schema
    const {  latitude, longitude } =
        createCheckInBodySchema.parse(request.body);

    // Parse the request params using the defined schema
    const { gymId } = createCheckInParamsSchema.parse(request.params);


    const checkInUseCase = makeCheckinUseCase()

    // Create a new checkin from User
    await checkInUseCase.execute({
        gymId,
        userId: request.user.id,
        userLatitude: latitude,
        userLongitude: longitude
    });



    // Return a 201 status code with an empty response
    return reply
        .status(201).send();
}