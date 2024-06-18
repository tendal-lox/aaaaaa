var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { samehSmsAuth } from './samehAuthentication.js';
export default class SmsServiceListAccess {
    constructor() {
        // this.redis = new RedisService()
    }
    smsListAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            // let samehAccessToken: number = await this.redis.get("samehAccessToken");
            let samehAccessToken;
            if (!samehAccessToken) {
                const { accessToken } = yield samehSmsAuth({ username: 'samehSmsProvider', password: 'sms12345678910' });
                samehAccessToken = accessToken;
            }
            try {
                const fetchResult = yield fetch('https://sameh.behdasht.gov.ir/api/v2/sms/updatedList', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${samehAccessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                const { data } = yield fetchResult.json();
                return { receivedSmsList: data === null || data === void 0 ? void 0 : data.updatedList, samehAccessToken };
            }
            catch (err) {
                console.error(err);
                return { message: '2سرویس سامح در دسترس نیست', statusCode: 403, err };
            }
        });
    }
    smsSender() {
        return __awaiter(this, void 0, void 0, function* () {
            const { receivedSmsList, samehAccessToken } = yield this.smsListAccess();
            console.log(1111111, receivedSmsList);
            for (const each of receivedSmsList) {
                const text = JSON.parse(each === null || each === void 0 ? void 0 : each.body);
                try {
                    const { data } = yield axios({
                        method: 'get',
                        url: `https://api.kavenegar.com/v1/${process.env.KAVENEGAR_API_KEY}/verify/lookup.json?receptor=${each === null || each === void 0 ? void 0 : each.to}&token=${text.token}&token10=${text.token10}&token20=${text.token20}&template=${each.template}`
                    });
                    if (data.entries[0].status === 5 && data.entries[0].statustext === 'ارسال به مخابرات') {
                        // API from sameh that update sms status to 2
                        yield axios({
                            method: 'put',
                            url: 'https://sameh.behdasht.gov.ir/api/v2/sms/updateSmsStatus',
                            data: { smsId: each.id },
                            headers: {
                                Authorization: `Bearer ${samehAccessToken}`,
                                "Content-Type": "application/json"
                            }
                        });
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
            return { message: 'API called successfully' };
        });
    }
}
;
