declare module 'fastify' {
    interface FastifyInstance {
        config: {
            PORT: number;
            REDIS_HOSTNAME: string;
            REDIS_PORT: number;
            KAVENEGAR_API_KEY: string;
        };
    }
}
export {};
