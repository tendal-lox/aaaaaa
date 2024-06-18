import Fastify from 'fastify'
import Redis from 'ioredis'

export default class RedisService {
  private redis: any
  
  async connect(redisPort: number, redisHost: string) {
    this.redis = new Redis({
      port: redisPort,
      host: redisHost,
    });
  }

  async setex(key: string, expiry: number, value: string) {
    try {
      this.redis.setex(key, expiry, value);
    } catch (err) {
      console.error(err)
    }
  }

  async set(key: string, value: string) {
    try {
      this.redis.set(key, value);
    } catch (err) {
      console.error(err)
    }
  }

  async get(key: string) {
    try {
      this.redis.get(key);
    } catch (err) {
      console.error(err)
    }
  }
};