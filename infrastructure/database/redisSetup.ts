import Redis from 'ioredis'

export default class RedisService {
  redis = new Redis({
    host: process.env['REDIS_HOSTNAME'],
    port: process.env['REDIS_PORT'],
  });

  async setex(key: string, expiry: number, value: string) {
    this.redis.setex(key, expiry, value);
  }

  async set(key: string, value: string) {
    this.redis.set(key, value);
  }

  async get(key: string) {
    this.redis.get(key);
  }
};