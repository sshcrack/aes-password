import test from 'ava';

import { packageComponents, unpackageComponents } from '../utils/Packager';

const encryptedPackager = 'Encrypted';
const info = {
  method: 'cbc',
  hmacHex: 'ThisIsJustATestHmac',
  iv: 'ThisIsAnIv',
  salt: 'ASaltYay!',
  rounds: 50,
};

let packaged: string;
test('Package', (t) => {
  packaged = packageComponents(encryptedPackager, info);

  t.pass('Can package');
});

test('Unpackage', (t) => {
  const unpackaged = unpackageComponents(packaged);

  t.is(unpackaged, {
    encryptedContent: encryptedPackager,
    ...info,
  });
});
