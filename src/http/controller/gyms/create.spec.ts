import request from 'supertest';
import { app } from '@/app';
import {describe, it, expect, beforeAll, afterAll} from "vitest";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";


describe('Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to create a gym', async () => {
        const { token } = await createAuthenticateUser(app, true);

        const createGymResponse = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'JavaScript Gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            });
        expect(createGymResponse.statusCode).toEqual(201);

    });
})