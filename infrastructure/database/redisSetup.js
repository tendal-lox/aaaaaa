import Redis from 'ioredis'

export default class RedisService {
  redis = new Redis({
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
  });
  redis = new Redis();

  async setex(key, expiry, value) {
    this.redis.setex(key, expiry, value);
  }

  async set(key, value) {
    this.redis.set(key, value);
  }

  async get(key) {
    this.redis.get(key);
  }
};