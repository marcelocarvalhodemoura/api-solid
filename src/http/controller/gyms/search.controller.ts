import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/services/factories/make-search-gyms-use-case";

/**
 * search some gyms.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function search(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define the shape of the request body
    const searchGymBodySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    });

    // Parse the request body using the defined schema
    const { query, page } = searchGymBodySchema.parse(request.query);


    const searchUseCase = makeSearchGymsUseCase()

    // search gyms
    const { gyms } = await searchUseCase.execute({
        query,
        page
    });



    // Return a 200 status code with an empty response
    return reply
        .status(200).send({
            gyms
        });
}