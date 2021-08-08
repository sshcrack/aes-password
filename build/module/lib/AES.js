/* eslint-disable functional/no-class */
import crypto from 'crypto';
import { pbkdf2 as deriveKey } from 'pbkdf2';
import { packageComponents, unpackageComponents } from './Packager';
const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;
const DERIVATION_ROUNDS = 200000;
export class AESEncryption {
    generateIV() {
        return Promise.resolve(Buffer.from(crypto.randomBytes(16)));
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
            output += crypto.randomBytes(3).toString('base64');
            if (output.length > length) {
                output = output.substr(0, length);
            }
        }
        return output;
    }
    pbkdf2(password, salt, rounds, bits) {
        return new Promise((resolve, reject) => {
            deriveKey(password, salt, rounds, bits / 8, 'sha256', (err, key) => {
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
        const encryptTool = crypto.createCipheriv('aes-256-cbc', derivedKey.key, iv);
        const hmacTool = crypto.createHmac('sha256', derivedKey.hmac);
        // Perform encryption
        let encryptedContent = encryptTool.update(text, 'utf8', 'base64');
        encryptedContent += encryptTool.final('base64');
        // Generate hmac
        hmacTool.update(encryptedContent);
        hmacTool.update(ivHex);
        hmacTool.update(salt);
        const hmacHex = hmacTool.digest('hex');
        return packageComponents(encryptedContent, {
            m: 'cbc',
            h: hmacHex,
            i: ivHex,
            s: salt,
            r: DERIVATION_ROUNDS,
        });
    }
    async decryptText(encryptedString, password) {
        const encryptedComponents = unpackageComponents(encryptedString);
        const derivedKey = await this.deriveFromPassword(password, encryptedComponents.s, encryptedComponents.r);
        const iv = Buffer.from(encryptedComponents.i, 'hex');
        // Get HMAC tool
        const hmacTool = crypto.createHmac('sha256', derivedKey.hmac);
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
        const decryptTool = crypto.createDecipheriv('aes-256-cbc', derivedKey.key, iv);
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
AESEncryption.instance = new AESEncryption();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUVTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9BRVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0NBQXdDO0FBQ3hDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsTUFBTSxJQUFJLFNBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFcEUsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBRWpDLE1BQU0sT0FBTyxhQUFhO0lBR2hCLFVBQVU7UUFDaEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLG1CQUFtQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQzlDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXhDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxRQUFRLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsT0FBTyxRQUFRLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWM7UUFDdkMsSUFBSSxNQUFNLElBQUks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