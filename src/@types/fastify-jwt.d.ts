import  "@fastify/jwt";

export declare module "@fastify/jwt" {
    interface FastifyJWT {

        user: {
            id: string;
            role: 'ADMIN' | 'MEMBER';
        }
    }
}

