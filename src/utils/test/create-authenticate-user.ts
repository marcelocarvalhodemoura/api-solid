import request from "supertest";
import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import {prisma} from "@/lib/prisma";
import {hash} from "bcryptjs";

export async function createAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    const randomicEmail = `johndoe${randomUUID()}@example.com`;
    await prisma.user.create({
        data: {
            name: "John Doe",
            email: randomicEmail,
            password_hash: await hash("123456",6),
            role: isAdmin ? "ADMIN" : "MEMBER"
        }
    })

    const authResponse = await request(app.server).post('/sessions').send({
        email: randomicEmail,
        password: "123456",
    });

    const { token } = authResponse.body;

    return {
        token
    }
}