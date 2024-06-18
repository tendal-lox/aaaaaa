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
// const redis = new RedisService();
export const samehSmsAuth = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    try {
        const axiosResult = yield axios({
            method: 'post',
            url: "https://sameh.behdasht.gov.ir/api/v2/user/login",
            data: { username, password },
            headers: { "Content-Type": "application/json" },
            validateStatus: null,
        });
        const { accessToken } = axiosResult.data.data;
        if (!accessToken)
            return { message: 'خطا در دریافت توکن', statusCode: 404 };
        // await redis.setex("samehAccessToken", 4800, accessToken);
        return {
            accessToken
        };
    }
    catch (error) {
        console.error(error);
        return { message: '1سرویس سامح در دسترس نیست', statusCode: 403 };
    }
});
