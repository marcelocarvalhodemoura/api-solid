import 'dotenv/config';
import { Environment } from 'vitest'
import { randomUUID } from "node:crypto";

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable.')
    }
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);
    return url.toString();
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    setup() {
        const schema = randomUUID();
        process.env.DATABASE_URL = generateDatabaseURL(schema);
        console.log('generate url = ',process.env.DATABASE_URL);
        // custom setup
        return {
            teardown() {
                // called after all tests with this env have been run
            }
        }
    }
}