import Fastify from 'fastify'
import * as sms from './routes/sms.js'
import dotenv from 'dotenv';
dotenv.config()

const fastify = Fastify({
  logger: true
})

fastify.register(sms, { prefix: '/sms' });
// fastify.register(require('./routes/v1/users'), { prefix: '/notification' })

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
    fastify.log.info('Web server connected')
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
await start()