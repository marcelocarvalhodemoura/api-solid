import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { search } from "@/http/controller/gyms/search.controller";
import { nearby } from "@/http/controller/gyms/nearby.controller";
import { create } from "@/http/controller/gyms/create.controller";
import {verifyUserRole} from "@/http/middlewares/verify-user-role";

/**
 * Registers the routes for the Fastify app.
 *
 * @param {FastifyInstance} app - The Fastify instance to register the routes on.
 * @return {Promise<void>} A promise that resolves when the routes are registered.
 */
export async function gymsRoutes(app: FastifyInstance) {
    // Verify JWT token on every request
    app.addHook("onRequest", verifyJwt);

    app.get("/gyms/search", search);
    app.get("/gyms/nearby",  nearby);

    app.post("/gyms",{ onRequest: [verifyUserRole("ADMIN")] }, create)
}