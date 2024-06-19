import request from 'supertest';
import { app } from '@/app';
import {describe, it, expect, beforeAll, afterAll} from "vitest";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";
import { randomUUID } from "node:crypto";


describe('Create CheckIn (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to create check-in', async () => {
        const { token } = await createAuthenticateUser(app, true);

        const gymResponse = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `JavaScript${randomUUID()} Gym`,
                description: 'Some description',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        const response = await request(app.server)
            .post(`/gyms/${gymResponse.body.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        expect(response.statusCode).toEqual(201);

    });
})