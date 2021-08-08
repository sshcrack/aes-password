const encryptorID = 'AES_PASS_ENCRYPTOR';

export function packageComponents(
  encryptedContent: string,
  { m, h, i, s, r }: PackagedComponents
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
    m: m,
    h: h,
    i: i,
    s: s,
    r: parseInt(r, 10),
    encryptedContent: encryptedContent,
  };

  return components;
}

export type PackagedComponents = {
  readonly m: string;
  readonly h: string;
  readonly i: string;
  readonly s: string;
  readonly r: number;
};

export type UnPackagedComponents = PackagedComponents & {
  readonly encryptedContent: string;
};
