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
/* eslint-disable functional/no-class */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUVTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9BRVMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUF3QztBQUN4QyxpREFBaUQ7QUFDakQsNkNBQTBDO0FBQzFDLGlEQUE4QztBQUM5QywrQ0FBMEU7QUFHMUUsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUM7QUFFakMsTUFBYSxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQVksRUFBRSxRQUFnQjtRQUNqRCxNQUFNLElBQUksR0FBRyxNQUFNLHFCQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE1BQU0sVUFBVSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxrQkFBa0IsQ0FBQztZQUNsRCxRQUFRO1lBQ1IsSUFBSTtZQUNKLE1BQU0sRUFBRSxpQkFBaUI7U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsZ0JBQU0sQ0FBQyxjQUFjLENBQ3ZDLGFBQWEsRUFDYixVQUFVLENBQUMsR0FBRyxFQUNkLEVBQUUsQ0FDSCxDQUFDO1FBSUYsc0JBQXNCO1FBQ3RCLElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLGdCQUFnQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFJaEQsaUJBQWlCO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLGdCQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUQsUUFB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