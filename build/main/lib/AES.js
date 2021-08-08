"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESEncryption = void 0;
/* eslint-disable functional/no-class */
const crypto_1 = __importDefault(require("crypto"));
const pbkdf2_1 = require("pbkdf2");
const Packager_1 = require("./Packager");
const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;
const DERIVATION_ROUNDS = 200000;
class AESEncryption {
    generateIV() {
        return Promise.resolve(Buffer.from(crypto_1.default.randomBytes(16)));
    }
    constantTimeCompare(a, b) {
        if (a.length !== b.length)
            return false;
        let sentinel = 0;
        for (let i = 0; i <= a.length - 1; i += 1) {
            sentinel |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return sentinel === 0;
    }
    async generateSalt(length) {
        if (length <= 0)
            throw new Error(`Failed generating salt: Invalid length supplied: ${length}`);
        let output = '';
        while (output.length < length) {
            output += crypto_1.default.randomBytes(3).toString('base64');
            if (output.length > length) {
                output = output.substr(0, length);
            }
        }
        return output;
    }
    pbkdf2(password, salt, rounds, bits) {
        return new Promise((resolve, reject) => {
            pbkdf2_1.pbkdf2(password, salt, rounds, bits / 8, 'sha256', (err, key) => {
                if (err)
                    return reject(err);
                resolve(key);
            });
        });
    }
    async deriveFromPassword(password, salt, rounds) {
        return new Promise((resolve, reject) => {
            const bits = (PASSWORD_KEY_SIZE + HMAC_KEY_SIZE) * 8;
            if (!password)
                reject(new Error('Failed deriving key: Password must be provided'));
            if (!salt)
                reject(new Error('Failed deriving key: Salt must be provided'));
            if (!rounds || rounds <= 0 || typeof rounds !== 'number')
                reject(new Error('Failed deriving key: Rounds must be greater than 0'));
            this.pbkdf2(password, salt, rounds, bits).then((raw) => {
                const derivedKeyHex = raw.toString('hex');
                const dkhLength = derivedKeyHex.length;
                const keyBuffer = Buffer.from(derivedKeyHex.substr(0, dkhLength / 2), 'hex');
                const hmacHex = Buffer.from(derivedKeyHex.substr(dkhLength / 2, dkhLength / 2), 'hex');
                resolve({
                    salt: salt,
                    key: keyBuffer,
                    rounds: rounds,
                    hmac: hmacHex,
                });
            });
        });
    }
    async encryptText(text, password) {
        const salt = await this.generateSalt(12);
        const iv = await this.generateIV();
        const ivHex = iv.toString('hex');
        const derivedKey = await this.deriveFromPassword(password, salt, DERIVATION_ROUNDS);
        const encryptTool = crypto_1.default.createCipheriv('aes-256-cbc', derivedKey.key, iv);
        const hmacTool = crypto_1.default.createHmac('sha256', derivedKey.hmac);
        // Perform encryption
        let encryptedContent = encryptTool.update(text, 'utf8', 'base64');
        encryptedContent += encryptTool.final('base64');
        // Generate hmac
        hmacTool.update(encryptedContent);
        hmacTool.update(ivHex);
        hmacTool.update(salt);
        const hmacHex = hmacTool.digest('hex');
        return Packager_1.packageComponents(encryptedContent, {
            m: 'cbc',
            h: hmacHex,
            i: ivHex,
            s: salt,
            r: DERIVATION_ROUNDS,
        });
    }
    async decryptText(encryptedString, password) {
        const encryptedComponents = Packager_1.unpackageComponents(encryptedString);
        const derivedKey = await this.deriveFromPassword(password, encryptedComponents.s, encryptedComponents.r);
        const iv = Buffer.from(encryptedComponents.i, 'hex');
        // Get HMAC tool
        const hmacTool = crypto_1.default.createHmac('sha256', derivedKey.hmac);
        const hmacData = encryptedComponents.h;
        // Generate the HMAC
        hmacTool.update(encryptedComponents.encryptedContent);
        hmacTool.update(encryptedComponents.i);
        hmacTool.update(encryptedComponents.s);
        // Check hmac for tampering
        const newHmaxHex = hmacTool.digest('hex');
        if (this.constantTimeCompare(hmacData, newHmaxHex) !== true)
            throw new Error('Authentication failed while decrypting content');
        // Decrypt
        const decryptTool = crypto_1.default.createDecipheriv('aes-256-cbc', derivedKey.key, iv);
        const decryptedText = decryptTool.update(encryptedComponents.encryptedContent, 'base64', 'utf8');
        return `${decryptedText}${decryptTool.final('utf8')}`;
    }
    static encrypt(plain, password) {
        return AESEncryption.instance.encryptText(plain, password);
    }
    static decrypt(encrypted, password) {
        return AESEncryption.instance.decryptText(encrypted, password);
    }
}
exports.AESEncryption = AESEncryption;
AESEncryption.instance = new AESEncryption();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUVTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9BRVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0NBQXdDO0FBQ3hDLG9EQUE0QjtBQUU1QixtQ0FBNkM7QUFFN0MseUNBQW9FO0FBRXBFLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN6QixNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUM3QixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUVqQyxNQUFhLGFBQWE7SUFHaEIsVUFBVTtRQUNoQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLG1CQUFtQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQzlDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXhDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxRQUFRLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsT0FBTyxRQUFRLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWM7UUFDdkMsSUFBSSxNQUFNLElBQUksQ0FBQztZQUNiLE1BQU0sSUFBSSxLQUFLLENBQ2Isb0RBQW9ELE1BQU0sRUFBRSxDQUM3RCxDQUFDO1FBRUosSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE9B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