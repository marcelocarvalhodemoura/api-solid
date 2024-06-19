import request from 'supertest';
import { app } from '@/app';
import {describe, it, expect, beforeAll, afterAll} from "vitest";
import { createAuthenticateUser } from "@/utils/test/create-authenticate-user";


describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to get user profile', async () => {
       const { token } = await createAuthenticateUser(app);

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(profileResponse.statusCode).toEqual(200);
        expect(profileResponse.body).toEqual(
            expect.objectContaining({
                name: 'John Doe',
            }),
        );
    });
})