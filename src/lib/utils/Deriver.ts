import { pbkdf2 as deriveKey } from 'crypto';

const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;

export class Deriver {
  public static pbkdf2({
    password,
    salt,
    rounds,
    bits,
  }: pbkdf2Input): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      deriveKey(password, salt, rounds, bits / 8, 'sha256', (err, key) => {
        if (err) return reject(err);

        resolve(key);
      });
    });
  }

  public static deriveFromPassword({
    password,
    salt,
    rounds,
  }: DeriveIn): Promise<DeriveOut> {
    return new Promise(async (resolve, reject) => {
      const bits = (PASSWORD_KEY_SIZE + HMAC_KEY_SIZE) * 8;
      if (!password)
        reject(new Error('Failed deriving key: Password must be provided'));

      if (!salt)
        reject(new Error('Failed deriving key: Salt must be provided'));

      if (!rounds || rounds <= 0 || typeof rounds !== 'number')
        reject(new Error('Failed deriving key: Rounds must be greater than 0'));

      try {
        const raw = await this.pbkdf2({ password, salt, rounds, bits });
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
      } catch (e) {
        reject(e);
      }
    });
  }
}

type pbkdf2Input = {
  readonly password: string;
  readonly salt: string;
  readonly rounds: number;
  readonly bits: number;
};

type DeriveIn = {
  readonly password: string;
  readonly salt: string;
  readonly rounds: number;
};

type DeriveOut = {
  readonly salt: string;
  readonly key: Buffer;
  readonly rounds: number;
  readonly hmac: Buffer;
};
