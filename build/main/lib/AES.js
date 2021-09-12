"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESEncryption = void 0;
const crypto_1 = __importStar(require("crypto"));
const Deriver_1 = require("./utils/Deriver");
const Generator_1 = require("./utils/Generator");
const Packager_1 = require("./utils/Packager");
const DERIVATION_ROUNDS = 200000;
class AESEncryption {
    static async encrypt(text, password) {
        const salt = await Generator_1.Generator.generateSalt(12);
        const iv = await Generator_1.Generator.generateIV();
        const ivHex = iv.toString('hex');
        const derivedKey = await Deriver_1.Deriver.deriveFromPassword({
            password,
            salt,
            rounds: DERIVATION_ROUNDS
        });
        const encryptTool = crypto_1.default.createCipheriv('aes-256-cbc', derivedKey.key, iv);
        //? Perform encryption
        let encryptedContent = encryptTool.update(text, 'utf8', 'base64');
        encryptedContent += encryptTool.final('base64');
        //? Generate hmac
        const hmacTool = crypto_1.default.createHmac('sha256', derivedKey.hmac);
        hmacTool.update(encryptedContent);
        hmacTool.update(ivHex);
        hmacTool.update(salt);
        const hmacHex = hmacTool.digest('hex');
        const packaged = (0, Packager_1.packageComponents)(encryptedContent, {
            method: 'cbc',
            hmacHex: hmacHex,
            iv: ivHex,
            salt: salt,
            rounds: DERIVATION_ROUNDS,
        });
        return packaged;
    }
    static async decrypt(encryptedString, password) {
        const encryptedComponents = (0, Packager_1.unpackageComponents)(encryptedString);
        const iv = Buffer.from(encryptedComponents.iv, 'hex');
        const derivedKey = await Deriver_1.Deriver.deriveFromPassword({
            password,
            salt: encryptedComponents.salt,
            rounds: encryptedComponents.rounds
        });
        //? -------------------------------------------
        //?  Get an sha256 hmac of packaged components
        //? -------------------------------------------
        //? Get HMAC tool
        const hmacTool = crypto_1.default.createHmac('sha256', derivedKey.hmac);
        const hmacData = encryptedComponents.hmacHex;
        //? Generate the HMAC
        hmacTool.update(encryptedComponents.encryptedContent);
        hmacTool.update(encryptedComponents.iv);
        hmacTool.update(encryptedComponents.salt);
        //? Check hmac for tampering
        const newHmaxHex = hmacTool.digest('hex');
        const newHmacBuffer = Buffer.from(newHmaxHex, "hex");
        const hmacBuffer = Buffer.from(hmacData, "hex");
        if ((0, crypto_1.timingSafeEqual)(hmacBuffer, newHmacBuffer) !== true)
            throw new Error('Authentication failed while decrypting content');
        //? Decrypt
        const decryptTool = crypto_1.default.createDecipheriv('aes-256-cbc', derivedKey.key, iv);
        const decryptedText = decryptTool.update(encryptedComponents.encryptedContent, 'base64', 'utf8');
        return `${decryptedText}${decryptTool.final('utf8')}`;
    }
}
exports.AESEncryption = AESEncryption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUVTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9BRVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFpRDtBQUVqRCw2Q0FBMEM7QUFDMUMsaURBQThDO0FBQzlDLCtDQUEwRTtBQUcxRSxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUVqQyxNQUFhLGFBQWE7SUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWdCO1FBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxxQkFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxpQkFBTyxDQUFDLGtCQUFrQixDQUFDO1lBQ2xELFFBQVE7WUFDUixJQUFJO1lBQ0osTUFBTSxFQUFFLGlCQUFpQjtTQUMxQixDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxnQkFBTSxDQUFDLGNBQWMsQ0FDdkMsYUFBYSxFQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQ2QsRUFBRSxDQUNILENBQUM7UUFJRixzQkFBc0I7UUFDdEIsSUFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEUsZ0JBQWdCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUloRCxpQkFBaUI7UUFDakIsTUFBTSxRQUFRLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5RCxRQUFRLENBQUMsTUFBTSxD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