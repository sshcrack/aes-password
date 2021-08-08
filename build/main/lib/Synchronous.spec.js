"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const ava_1 = __importDefault(require("ava"));
const AES_1 = require("./AES");
const strLength = 20;
ava_1.default('SYNC: Encrypt', (t) => {
    const key = randomString();
    const str = randomString(strLength);
    try {
        const encrypted = AES_1.AESEncryption.encryptSync(str, key);
        t.pass(`Encrypted text is ${encrypted}, plain ${str}`);
    }
    catch (err) {
        t.fail(err);
    }
});
ava_1.default('SYNC: Encrypt & Decrypt', (t) => {
    const key = randomString();
    const str = randomString(strLength);
    try {
        const encrypted = AES_1.AESEncryption.encryptSync(str, key);
        const decrypted = AES_1.AESEncryption.decryptSync(encrypted, key);
        t.true(str === decrypted);
    }
    catch (err) {
        t.fail(err);
    }
});
function randomString(length = 50) {
    return crypto_1.default.randomBytes(length).toString('base64');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3luY2hyb25vdXMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvU3luY2hyb25vdXMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE0QjtBQUU1Qiw4Q0FBdUI7QUFFdkIsK0JBQXNDO0FBRXRDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixhQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDMUIsTUFBTSxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDM0IsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBDLElBQUk7UUFDRixNQUFNLFNBQVMsR0FBRyxtQkFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsU0FBUyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDeEQ7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDM0IsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBDLElBQUk7UUFDRixNQUFNLFNBQVMsR0FBRyxtQkFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsTUFBTSxTQUFTLEdBQUcsbUJBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTVELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0tBQzNCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFO0lBQy9CLE9BQU8sZ0JBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELENBQUMifQ==