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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUVTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9BRVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLEVBQUUsRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUcxRSxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUVqQyxNQUFNLE9BQU8sYUFBYTtJQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFZLEVBQUUsUUFBZ0I7UUFDakQsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsa0JBQWtCLENBQUM7WUFDbEQsUUFBUTtZQUNSLElBQUk7WUFDSixNQUFNLEVBQUUsaUJBQWlCO1NBQzFCLENBQUMsQ0FBQztRQUNILE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLGFBQWEsRUFDYixVQUFVLENBQUMsR0FBRyxFQUNkLEVBQUUsQ0FDSCxDQUFDO1FBSUYsc0JBQXNCO1FBQ3RCLElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLGdCQUFnQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxD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