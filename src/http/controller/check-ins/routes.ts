import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { create } from "@/http/controller/check-ins/create.controller";
import { validate } from "@/http/controller/check-ins/validate.controller";
import { history } from "@/http/controller/check-ins/history.controller";
import { metrics } from "@/http/controller/check-ins/metrics.controller";
import {verifyUserRole} from "@/http/middlewares/verify-user-role";


/**
 * Registers the routes for the Fastify app.
 *
 * @param {FastifyInstance} app - The Fastify instance to register the routes on.
 * @return {Promise<void>} A promise that resolves when the routes are registered.
 */
export async function checkInsRoutes(app: FastifyInstance) {
    // Verify JWT token on every request
    app.addHook("onRequest", verifyJwt);

    app.get("/check-ins/history", history);
    app.get("/check-ins/metrics", metrics);

    app.post("/gyms/:gymId/check-ins", create);
    app.patch("/check-ins/:checkInId/validate", { onRequest: [verifyUserRole("ADMIN")] }, validate);
}