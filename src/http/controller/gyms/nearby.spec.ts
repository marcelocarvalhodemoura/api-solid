import request from 'supertest';
import { app } from '@/app';
import {describe, it, expect, beforeAll, afterAll} from "vitest";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";



describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to verify nearby gyms', async () => {
        const { token } = await createAuthenticateUser(app, true);

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'JavaScript Gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'TypeScript Gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -27.0610928,
                longitude: -49.5229501,
            });

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -27.0610928,
                longitude: -49.5229501,
            })
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);

    });
})