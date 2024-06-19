import { FastifyRequest, FastifyReply } from "fastify";
import {makeGetUserProfileUseCase} from "@/services/factories/make-get-user-profile-use-case";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const getProfileUseCase = makeGetUserProfileUseCase();
    try {
        const { user } = await getProfileUseCase.execute(request.user.id);
        return reply.status(200).send({
            ...user,
            password_hash: undefined
        });
    } catch (error) {
        console.log(error)
    }

}