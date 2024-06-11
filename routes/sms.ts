import { samehSmsAuth } from '../services/samehAuthentication.js'
import SmsServiceListAccess from '../services/smsService.js'
import cron from 'node-cron'

const services = new SmsServiceListAccess()

export default function (fastify: any, opts: any, done: any) {
  // cron.schedule('*/10 * * * * *', async () => {
  //   await samehSmsAuth({ username: 'samehSmsProvider', password: 'sms12345678910' });
  // });
  
  fastify.get('/auth', samehSmsAuth);

  fastify.get('/smsList', services.smsListAccess);

  fastify.get('/sendSms', services.smsSender);

  done();
};