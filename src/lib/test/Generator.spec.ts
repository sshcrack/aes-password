import test from "ava"

import { Generator } from "../utils/Generator"

test("IV is 16 bytes long", async t => {
  const iv = await Generator.generateIV()

  t.is(iv.length, 16)
})

test("Salt generates specified length", async t => {
  const randomNumber = Math.round(Math.random()) * 100
  const salt = await Generator.generateSalt(randomNumber);

  t.is(salt.length, randomNumber)
})

test("Salt fails on wrong arguments", t => {
  Generator.generateSalt(0)
    .then(() => t.fail())
    .catch(() => t.pass())
})
