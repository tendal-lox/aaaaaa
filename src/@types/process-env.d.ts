declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            REDIS_HOSTNAME: string;
            REDIS_PORT: number;
            KAVENEGAR_API_KEY: string
        }
    }
}
export {}
