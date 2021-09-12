import test from "ava"

import { Deriver } from "../utils/Deriver"
import { Generator } from "../utils/Generator"

const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;

const bits = (PASSWORD_KEY_SIZE + HMAC_KEY_SIZE) * 8;
const ROUNDS = 100000
test("Reliable pbkdf2 generation", async t => {
  //Password with 16 chars
  const pass = await Generator.generateSalt(16)

  const salt = await Generator.generateSalt(12)

  const options = {
    password: pass,
    salt: salt,
    rounds: ROUNDS,
    bits
  }

  const derived1 = await Deriver.pbkdf2(options)
  const derived2 = await Deriver.pbkdf2(options)

  t.is(derived1, derived2)
})

test("Derive is reliable", async t => {
  //Password with 16 chars
  const pass = await Generator.generateSalt(16)

  const salt = await Generator.generateSalt(12)

  const options = {
    password: pass,
    salt: salt,
    rounds: ROUNDS
  }
  const derived1 = await Deriver.deriveFromPassword(options)
  const derived2 = await Deriver.deriveFromPassword(options)

  t.is(derived1, derived2)
})
