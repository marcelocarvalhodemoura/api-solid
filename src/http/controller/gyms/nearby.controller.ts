import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsUseCase } from "@/services/factories/make-fetch-nearby-gyms-use-case";

/**
 * Registers a new gyms.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function nearby(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define the shape of the request body
    const nearbyhGymBodySchema = z.object({
        latitude:z.coerce.number().refine(value =>{
            return Math.abs(value) <= 90
        }),
        longitude:z.coerce.number().refine(value =>{
            return Math.abs(value) <= 180
        })
    });

    // Parse the request body using the defined schema
    const { latitude, longitude } = nearbyhGymBodySchema.parse(request.query);


    const nearByUseCase = makeFetchNearbyGymsUseCase()

    // search gyms
    const { gyms } = await nearByUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    });


    // Return a 200 status code with an empty response
    return reply
        .status(200).send({
            gyms
        });
}