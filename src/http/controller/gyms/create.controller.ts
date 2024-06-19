import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "@/services/factories/make-create-gym-use-case";

/**
 * Registers a new gyms.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define the shape of the request body
    const createGymBodySchema = z.object({
        name:z.string(),
        phone:z.string(),
        description:z.string(),
        latitude:z.coerce.number().refine(value =>{
            return Math.abs(value) <= 90
        }),
        longitude:z.coerce.number().refine(value =>{
            return Math.abs(value) <= 180
        })
    });

    // Parse the request body using the defined schema
    const { name, phone, description, latitude, longitude } =
        createGymBodySchema.parse(request.body);


    const createUseCase = makeCreateGymUseCase()

    // Create a new gym in dependency injection
    await createUseCase.execute({
        name,
        phone,
        description,
        latitude,
        longitude
    });



    // Return a 201 status code with an empty response
    return reply
        .status(201).send();
}