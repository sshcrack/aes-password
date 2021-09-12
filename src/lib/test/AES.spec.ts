import crypto from 'crypto';

import test from 'ava';

import { AESEncryption } from '../AES';

const strLength = 20;

test('Encrypt', async (t) => {
  const key = randomString();
  const str = randomString(strLength);

  try {
    const encrypted = await AESEncryption.encrypt(str, key);
    t.pass(`Encrypted text is ${encrypted}, plain ${str}`);
  } catch (err) {
    t.fail(err);
  }
});

test('Encrypt & Decrypt', async (t) => {
  const key = randomString();
  const str = randomString(strLength);

  try {
    const encrypted = await AESEncryption.encrypt(str, key);
    const decrypted = await AESEncryption.decrypt(encrypted, key);

    t.true(str === decrypted);
  } catch (err) {
    t.fail(err);
  }
});

function randomString(length = 50) {
  return crypto.randomBytes(length).toString('base64');
}
