import Fastify from 'fastify'
import sms from './routes/sms.js'
import fastifyEnv from '@fastify/env'
import RedisService from './infrastructure/database/redisSetup.js'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number,
      REDIS_HOSTNAME: string,
      REDIS_PORT: number,
      KAVENEGAR_API_KEY: string
    };
  }
}

const options = {
  schema: {
    type: 'object',
    required: ['PORT', 'REDIS_HOSTNAME', 'REDIS_PORT', 'KAVENEGAR_API_KEY'],
    properties: {
      PORT: {
        type: 'number',
        default: 3000
      },
      REDIS_HOSTNAME: {
        type: 'string'
      },
      REDIS_PORT: {
        type: 'number'
      },
      KAVENEGAR_API_KEY: {
        type: 'string'
      }
    }
  },
  dotenv: true,
}

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyEnv, options)
fastify.register(sms, { prefix: '/sms' });
// fastify.register(require('./routes/v1/users'), { prefix: '/notification' })


(async () => {
  try {
    console.log(11111, fastify)
    fastify.listen({port: 3000})
    // await new RedisService().connect(fastify?.config?.REDIS_PORT, fastify?.config?.REDIS_HOSTNAME)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
})()