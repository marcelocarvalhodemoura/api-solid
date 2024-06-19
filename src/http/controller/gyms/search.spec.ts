import request from 'supertest';
import { app } from '@/app';
import {describe, it, expect, beforeAll, afterAll} from "vitest";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";
import {randomUUID} from "node:crypto";


describe('Search Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to search gyms', async () => {
        const { token } = await createAuthenticateUser(app, true);
        const gym1 = `JavaScript${randomUUID()} Gym`;
        const gym2 = `TypeScript${randomUUID()} Gym`;

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: gym1,
                description: 'Some description',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: gym2,
                description: 'Some description',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            });

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: gym2,
            })
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                name: gym2,
            }),
        ]);
    });
})