import axios from 'axios';
import RedisService from "../infrastructure/database/redisSetup.js";
import { samehSmsAuth } from './samehAuthentication.js'

export default class SmsServiceListAccess {
  private redis: any

  constructor() {
    // this.redis = new RedisService()
  }

  async smsListAccess() {
    // let samehAccessToken: number = await this.redis.get("samehAccessToken");

    let samehAccessToken
    if (!samehAccessToken) {
      const { accessToken } = await samehSmsAuth({ username: 'samehSmsProvider', password: 'sms12345678910' });
      samehAccessToken = accessToken;
    }

    try {
      const fetchResult = await fetch('https://sameh.behdasht.gov.ir/api/v2/sms/updatedList', {
        method: 'GET',
        headers:{
          Authorization: `Bearer ${samehAccessToken}`,
          "Content-Type": "application/json"
        }})
      const {data} = await fetchResult.json()

      return { receivedSmsList: data?.updatedList, samehAccessToken };
    } catch (err) {
      console.error(err);
      return { message: '2سرویس سامح در دسترس نیست', statusCode: 403, err };
    }
  }

  async smsSender() {
    const { receivedSmsList, samehAccessToken } = await this.smsListAccess();

    console.log(1111111, receivedSmsList);

    for (const each of receivedSmsList) {
      const text = JSON.parse(each?.body);

      try {
        const { data } = await axios({
          method: 'get',
          url: `https://api.kavenegar.com/v1/${process.env.KAVENEGAR_API_KEY}/verify/lookup.json?receptor=${each?.to}&token=${text.token}&token10=${text.token10}&token20=${text.token20}&template=${each.template}`
        });

        if (data.entries[0].status === 5 && data.entries[0].statustext === 'ارسال به مخابرات') {
          // API from sameh that update sms status to 2
          await axios({
            method: 'put',
            url: 'https://sameh.behdasht.gov.ir/api/v2/sms/updateSmsStatus',
            data: { smsId: each.id },
            headers: {
              Authorization: `Bearer ${samehAccessToken}`,
              "Content-Type": "application/json"
            }
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    return { message: 'API called successfully' };
  }
};