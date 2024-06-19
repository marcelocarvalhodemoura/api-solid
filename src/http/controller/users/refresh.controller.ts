import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Refresh token.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to void.
 */
export async function refresh(
    request: FastifyRequest,
    reply: FastifyReply
) {
    // Validate if user is logged in and  verify refresh token exist
    await request.jwtVerify({ onlyCookie: true });

    const { role } = request.user;
    const token = await reply.jwtSign({
            id: request.user.id,
        }
    );

    const refreshToken = await reply.jwtSign({
            id: request.user.id,
            role: role
        },
        {
            sign: {
                sub: request.user.id ,
                expiresIn: "7d",
            }

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

}