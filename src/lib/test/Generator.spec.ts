import test from 'ava';

import { Generator } from '../utils/Generator';

test('IV is 16 bytes long', async (t) => {
  const iv = await Generator.generateIV();

  t.is(iv.length, 16);
});

test('Salt generates specified length', async (t) => {
  const randomNumber = Math.round(Math.random() * 100);
  const nonNull = randomNumber === 0 ? 1 : randomNumber;

  console.log('Random number');
  const salt = await Generator.generateSalt(nonNull);

  t.deepEqual(salt.length, nonNull);
});

test('Salt fails with wrong arguments', async (t) => {
  const res = await Generator.generateSalt(0).catch(() => {
    /* Its getting checked by outer class */
  });

  t.falsy(res);
});
