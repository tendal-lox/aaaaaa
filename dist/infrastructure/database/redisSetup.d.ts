export default class RedisService {
    private redis;
    connect(redisPort: number, redisHost: string): Promise<void>;
    setex(key: string, expiry: number, value: string): Promise<void>;
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<void>;
}
