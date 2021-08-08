/* eslint-disable functional/no-class */
import crypto from 'crypto';

import { pbkdf2 as deriveKey } from 'pbkdf2';

import { packageComponents, unpackageComponents } from './Packager';

const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;
const DERIVATION_ROUNDS = 200000;

export class AESEncryption {
  static readonly instance = new AESEncryption();

  private generateIV() {
    return Promise.resolve(Buffer.from(crypto.randomBytes(16)));
  }

  private constantTimeCompare(a: string, b: string) {
    if (a.length !== b.length) return false;

    let sentinel = 0;
    for (let i = 0; i <= a.length - 1; i += 1) {
      sentinel |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return sentinel === 0;
  }

  private async generateSalt(length: number) {
    if (length <= 0)
      throw new Error(
        `Failed generating salt: Invalid length supplied: ${length}`
      );

    let output = '';
    while (output.length < length) {
      output += crypto.randomBytes(3).toString('base64');
      if (output.length > length) {
        output = output.substr(0, length);
      }
    }

    return output;
  }

  private pbkdf2(
    password: string,
    salt: string,
    rounds: number,
    bits: number
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      deriveKey(password, salt, rounds, bits / 8, 'sha256', (err, key) => {
        if (err) return reject(err);

        resolve(key);
      });
    });
  }

  private async deriveFromPassword(
    password: string,
    salt: string,
    rounds: number
  ): Promise<DeriveOut> {
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
        const keyBuffer = Buffer.from(
          derivedKeyHex.substr(0, dkhLength / 2),
          'hex'
        );
        const hmacHex = Buffer.from(
          derivedKeyHex.substr(dkhLength / 2, dkhLength / 2),
          'hex'
        );

        resolve({
          salt: salt,
          key: keyBuffer,
          rounds: rounds,
          hmac: hmacHex,
        });
      });
    });
  }

  public async encryptText(text: string, password: string) {
    const salt = await this.generateSalt(12);
    const iv = await this.generateIV();
    const ivHex = iv.toString('hex');

    const derivedKey = await this.deriveFromPassword(
      password,
      salt,
      DERIVATION_ROUNDS
    );
    const encryptTool = crypto.createCipheriv(
      'aes-256-cbc',
      derivedKey.key,
      iv
    );
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

  public async decryptText(encryptedString: string, password: string) {
    const encryptedComponents = unpackageComponents(encryptedString);

    const derivedKey = await this.deriveFromPassword(
      password,
      encryptedComponents.s,
      encryptedComponents.r
    );
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

  static encrypt(plain: string, password: string) {
    return AESEncryption.instance.encryptText(plain, password);
  }

  static decrypt(encrypted: string, password: string) {
    return AESEncryption.instance.decryptText(encrypted, password);
  }
}

type DeriveOut = {
  readonly salt: string;
  readonly key: Buffer;
  readonly rounds: number;
  readonly hmac: Buffer;
};
