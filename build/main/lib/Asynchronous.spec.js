"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const ava_1 = __importDefault(require("ava"));
const AES_1 = require("./AES");
const strLength = 20;
ava_1.default('ASYNC: Encrypt', async (t) => {
    const key = randomString();
    const str = randomString(strLength);
    try {
        const encrypted = await AES_1.AESEncryption.encrypt(str, key);
        t.pass(`Encrypted text is ${encrypted}, plain ${str}`);
    }
    catch (err) {
        t.fail(err);
    }
});
ava_1.default('ASYNC: Encrypt & Decrypt', async (t) => {
    const key = randomString();
    const str = randomString(strLength);
    try {
        const encrypted = await AES_1.AESEncryption.encrypt(str, key);
        const decrypted = await AES_1.AESEncryption.decrypt(encrypted, key);
        t.true(str === decrypted);
    }
    catch (err) {
        t.fail(err);
    }
});
function randomString(length = 50) {
    return crypto_1.default.randomBytes(length).toString('base64');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXN5bmNocm9ub3VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL0FzeW5jaHJvbm91cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLDhDQUF1QjtBQUV2QiwrQkFBc0M7QUFFdEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLGFBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDakMsTUFBTSxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDM0IsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBDLElBQUk7UUFDRixNQUFNLFNBQVMsR0FBRyxNQUFNLG1CQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixTQUFTLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4RDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzNDLE1BQU0sR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQzNCLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwQyxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFOUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUM7S0FDM0I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUU7SUFDL0IsT0FBTyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkQsQ0FBQyJ9