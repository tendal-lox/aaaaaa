import Redis from 'ioredis';
export default class RedisService {
    redis: Redis;
    setex(key: string, expiry: number, value: string): Promise<void>;
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<void>;
}
