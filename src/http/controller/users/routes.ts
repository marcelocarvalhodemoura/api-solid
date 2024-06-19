import { FastifyInstance } from "fastify";
import { register } from "@/http/controller/users/register.controller";
import { authenticate } from "@/http/controller/users/authenticate.controller";
import { profile} from "@/http/controller/users/profile.controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { refresh } from "@/http/controller/users/refresh.controller";

/**
 * Registers the routes for the Fastify app.
 *
 * @param {FastifyInstance} app - The Fastify instance to register the routes on.
 * @return {Promise<void>} A promise that resolves when the routes are registered.
 */
export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);

    app.get( "/me", { onRequest: [verifyJwt] }, profile)

    app.patch("/token/refresh", refresh)
}