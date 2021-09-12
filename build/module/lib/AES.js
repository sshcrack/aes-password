/* eslint-disable functional/no-class */
import crypto, { timingSafeEqual } from 'crypto';
import { Deriver } from "./utils/Deriver";
import { Generator } from "./utils/Generator";
import { packageComponents, unpackageComponents } from './utils/Packager';
const DERIVATION_ROUNDS = 200000;
export class AESEncryption {
    static async encrypt(text, password) {
        const salt = await Generator.generateSalt(12);
        const iv = await Generator.generateIV();
        const ivHex = iv.toString('hex');
        const derivedKey = await Deriver.deriveFromPassword({
            password,
            salt,
            rounds: DERIVATION_ROUNDS
        });
        const encryptTool = crypto.createCipheriv('aes-256-cbc', derivedKey.key, iv);
        //? Perform encryption
        let encryptedContent = encryptTool.update(text, 'utf8', 'base64');
        encryptedContent += encryptTool.final('base64');
        //? Generate hmac
        const hmacTool = crypto.createHmac('sha256', derivedKey.hmac);
        hmacTool.update(encryptedContent);
        hmacTool.update(ivHex);
        hmacTool.update(salt);
        const hmacHex = hmacTool.digest('hex');
        const packaged = packageComponents(encryptedContent, {
            method: 'cbc',
            hmacHex: hmacHex,
            iv: ivHex,
            salt: salt,
            rounds: DERIVATION_ROUNDS,
        });
        return packaged;
    }
    static async decrypt(encryptedString, password) {
        const encryptedComponents = unpackageComponents(encryptedString);
        const iv = Buffer.from(encryptedComponents.iv, 'hex');
        const derivedKey = await Deriver.deriveFromPassword({
            password,
            salt: encryptedComponents.salt,
            rounds: encryptedComponents.rounds
        });
        //? -------------------------------------------
        //?  Get an sha256 hmac of packaged components
        //? -------------------------------------------
        //? Get HMAC tool
        const hmacTool = crypto.createHmac('sha256', derivedKey.hmac);
        const hmacData = encryptedComponents.hmacHex;
        //? Generate the HMAC
        hmacTool.update(encryptedComponents.encryptedContent);
        hmacTool.update(encryptedComponents.iv);
        hmacTool.update(encryptedComponents.salt);
        //? Check hmac for tampering
        const newHmaxHex = hmacTool.digest('hex');
        const newHmacBuffer = Buffer.from(newHmaxHex, "hex");
        const hmacBuffer = Buffer.from(hmacData, "hex");
        if (timingSafeEqual(hmacBuffer, newHmacBuffer) !== true)
            throw new Error('Authentication failed while decrypting content');
        //? Decrypt
        const decryptTool = crypto.createDecipheriv('aes-256-cbc', derivedKey.key, iv);
        const decryptedText = decryptTool.update(encryptedComponents.encryptedContent, 'base64', 'utf8');
        return `${decryptedText}${decryptTool.final('utf8')}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUVTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9BRVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0NBQXdDO0FBQ3hDLE9BQU8sTUFBTSxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHMUUsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUM7QUFFakMsTUFBTSxPQUFPLGFBQWE7SUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWdCO1FBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxNQUFNLEVBQUUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLGtCQUFrQixDQUFDO1lBQ2xELFFBQVE7WUFDUixJQUFJO1lBQ0osTUFBTSxFQUFFLGlCQUFpQjtTQUMxQixDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUN2QyxhQUFhLEVBQ2IsVUFBVSxDQUFDLEdBQUcsRUFDZCxFQUFFLENBQ0gsQ0FBQztRQUlGLHNCQUFzQjtRQUN0QixJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRSxnQkFBZ0IsSUFBSSxXQUFXLENBQUMsS0FB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