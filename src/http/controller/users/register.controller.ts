import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { makeRegisterUseCase } from "@/services/factories/make-register-use-case";

/**
 * Registers a new user.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define the shape of the request body
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    // Parse the request body using the defined schema
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase()
        
        // Create a new user in dependency injection
        await registerUseCase.execute({ name, email, password });

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            // Return a 409 status code if the user already exists
            return reply
                .status(409)
                .send({ message: error.message });
        }

        throw error;
    }

    // Return a 201 status code with an empty response
    return reply
        .status(201).send();
}