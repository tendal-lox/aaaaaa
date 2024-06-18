var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fastify from 'fastify';
import sms from './routes/sms.js';
import fastifyEnv from '@fastify/env';
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
};
const fastify = Fastify({
    logger: true
});
fastify.register(fastifyEnv, options);
fastify.register(sms, { prefix: '/sms' });
// fastify.register(require('./routes/v1/users'), { prefix: '/notification' })
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(11111, fastify);
        fastify.listen({ port: 3000 });
        // await new RedisService().connect(fastify?.config?.REDIS_PORT, fastify?.config?.REDIS_HOSTNAME)
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}))();
