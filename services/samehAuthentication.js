import axios from 'axios'
import RedisService from "../infrastructure/database/redisSetup.js";

// const redis = new RedisService();

export const samehSmsAuth = async ({username, password}) => {
  try {
    const axiosResult = await axios({
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
  } catch (error) {
    console.error(error);
    return { message: '1سرویس سامح در دسترس نیست', statusCode: 403 };
  }
};