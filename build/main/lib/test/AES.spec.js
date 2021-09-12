"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const ava_1 = __importDefault(require("ava"));
const AES_1 = require("../AES");
const strLength = 20;
(0, ava_1.default)('Encrypt', async (t) => {
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
(0, ava_1.default)('Encrypt & Decrypt', async (t) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUVTLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3QvQUVTLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFFNUIsOENBQXVCO0FBRXZCLGdDQUF1QztBQUV2QyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFHckIsSUFBQSxhQUFJLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMxQixNQUFNLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUMzQixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEMsSUFBSTtRQUNGLE1BQU0sU0FBUyxHQUFHLE1BQU0sbUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLFNBQVMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsYUFBSSxFQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNwQyxNQUFNLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUMzQixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEMsSUFBSTtRQUNGLE1BQU0sU0FBUyxHQUFHLE1BQU0sbUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sU0FBUyxHQUFHLE1BQU0sbUJBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTlELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0tBQzNCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFO0lBQy9CLE9BQU8sZ0JBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELENBQUMifQ==