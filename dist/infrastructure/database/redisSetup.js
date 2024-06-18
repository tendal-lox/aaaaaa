var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Redis from 'ioredis';
export default class RedisService {
    connect(redisPort, redisHost) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redis = new Redis({
                port: redisPort,
                host: redisHost,
            });
        });
    }
    setex(key, expiry, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.redis.setex(key, expiry, value);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.redis.set(key, value);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.redis.get(key);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
;
