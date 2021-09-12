const encryptorID = 'AES_PASS_ENCRYPTOR';

export function packageComponents(
  encryptedContent: string,
  { method: m, hmacHex: h, iv: i, salt: s, rounds: r }: PackagedComponents
) {
  const formatted = `$${encryptorID}$${m},${h},${i},${s},${r}$${encryptedContent}`;

  return Buffer.from(formatted).toString('base64');
}

export function unpackageComponents(raw: string) {
  const str = Buffer.from(raw, 'base64').toString();

  const [, encryptor, componentsStr, encryptedContent] = str.split('$');
  if (encryptor !== encryptorID)
    throw new Error('Failed decrypting: unrecognized encrypted payload');

  const [m, h, i, s, r] = componentsStr.split(',');
  const components: UnPackagedComponents = {
    method: m,
    hmacHex: h,
    iv: i,
    salt: s,
    rounds: parseInt(r, 10),
    encryptedContent: encryptedContent,
  };

  return components;
}

export type PackagedComponents = {
  readonly method: string;
  readonly hmacHex: string;
  readonly iv: string;
  readonly salt: string;
  readonly rounds: number;
};

export type UnPackagedComponents = PackagedComponents & {
  readonly encryptedContent: string;
};
