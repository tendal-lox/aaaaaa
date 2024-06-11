import Fastify from 'fastify'
import * as sms from './routes/sms.js'
import dotenv from 'dotenv';
dotenv.config()

const fastify = Fastify({
  logger: true
})

fastify.register(sms, { prefix: '/sms' });
// fastify.register(require('./routes/v1/users'), { prefix: '/notification' })

fastify.listen({ port: process.env.PORT }, (err: any, address: string) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server listening at ${address}`)
})