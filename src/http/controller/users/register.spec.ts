import request from 'supertest';
import { app } from '@/app';
import {describe, it, expect, beforeAll, afterAll} from "vitest";
import {randomUUID} from "node:crypto";


describe('Register (e2e)', () => {
  beforeAll(async () => {
      await app.ready();
  });

  afterAll(async () => {
      await app.close();
  });

  it('should be able to register', async () => {
    const random = randomUUID();
    const response = await request(app.server)
        .post('/users')
          .send({
              name:"John Doe",
              email:`johndoe${random}@example.com`,
              password: "123456",
          });

    expect(response.statusCode).toEqual(201);
  });
})