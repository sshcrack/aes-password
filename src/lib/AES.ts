import crypto, { timingSafeEqual } from 'crypto';

import { Deriver } from './utils/Deriver';
import { Generator } from './utils/Generator';
import { packageComponents, unpackageComponents } from './utils/Packager';

const DERIVATION_ROUNDS = 200000;

export class AESEncryption {
  static async encrypt(text: string, password: string) {
    const salt = await Generator.generateSalt(12);
    const iv = await Generator.generateIV();
    const ivHex = iv.toString('hex');

    const derivedKey = await Deriver.deriveFromPassword({
      password,
      salt,
      rounds: DERIVATION_ROUNDS,
    });
    const encryptTool = crypto.createCipheriv(
      'aes-256-cbc',
      derivedKey.key,
      iv
    );

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

  static async decrypt(encryptedString: string, password: string) {
    const encryptedComponents = unpackageComponents(encryptedString);

    const iv = Buffer.from(encryptedComponents.iv, 'hex');
    const derivedKey = await Deriver.deriveFromPassword({
      password,
      salt: encryptedComponents.salt,
      rounds: encryptedComponents.rounds,
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
    const newHmacHex = hmacTool.digest('hex');

    const newHmacBuffer = Buffer.from(newHmacHex, 'hex');
    const hmacBuffer = Buffer.from(hmacData, 'hex');

    if (timingSafeEqual(hmacBuffer, newHmacBuffer) !== true)
      throw new Error('Authentication failed while decrypting content');

    //? Decrypt
    const decryptTool = crypto.createDecipheriv(
      'aes-256-cbc',
      derivedKey.key,
      iv
    );

    const decryptedText = decryptTool.update(
      encryptedComponents.encryptedContent,
      'base64',
      'utf8'
    );

    return `${decryptedText}${decryptTool.final('utf8')}`;
  }
}
