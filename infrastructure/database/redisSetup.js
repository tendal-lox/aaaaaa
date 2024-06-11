import Redis from 'ioredis';
export default class RedisService {
    constructor() {
        this.redis = new Redis({
            host: process.env['REDIS_HOSTNAME'],
            port: process.env['REDIS_PORT'],
        });
    }
    async setex(key, expiry, value) {
        this.redis.setex(key, expiry, value);
    }
    async set(key, value) {
        this.redis.set(key, value);
    }
    async get(key) {
        this.redis.get(key);
    }
}
;
