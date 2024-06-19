import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/services/factories/make-authenticate-use-case";

/**
 * Registers a new user.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
) {
    // Define the shape of the request body
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    // Parse the request body using the defined schema
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();

        // Authenticate the user
        const { user } = await authenticateUseCase.execute({
            email,
            password
        });

        
        const token = await reply.jwtSign({
                id: user.id,
                role: user.role
            }
        );

        const refreshToken = await reply.jwtSign({
                id: user.id,
            },
            {
                expiresIn: "7d",
            }
        );
        
        return reply
            .setCookie("refreshToken", refreshToken, {
                path: '/', //  All requests using refresh token will allow
                secure: true, // Set this to true if the app is running on HTTPS
                sameSite: true, // Set this to 'none' if the app is running on HTTPS
                httpOnly: true, // Backend only cookie
            })
            .status(200).send({
            token,
        });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            // Return a 409 status code if the user already exists
            return reply
                .status(409)
                .send({ message: error.message });
        }

        throw error;
    }


}