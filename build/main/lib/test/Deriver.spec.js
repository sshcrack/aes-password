"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const Generator_1 = require("../utils/Generator");
const Deriver_1 = require("../utils/Deriver");
const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;
const bits = (PASSWORD_KEY_SIZE + HMAC_KEY_SIZE) * 8;
const ROUNDS = 100000;
(0, ava_1.default)("Reliable pbkdf2 generation", async (t) => {
    //Password with 16 chars
    const pass = await Generator_1.Generator.generateSalt(16);
    const salt = await Generator_1.Generator.generateSalt(12);
    const options = {
        password: pass,
        salt: salt,
        rounds: ROUNDS,
        bits
    };
    const derived1 = await Deriver_1.Deriver.pbkdf2(options);
    const derived2 = await Deriver_1.Deriver.pbkdf2(options);
    t.is(derived1, derived2);
});
(0, ava_1.default)("Derive is reliable", async (t) => {
    //Password with 16 chars
    const pass = await Generator_1.Generator.generateSalt(16);
    const salt = await Generator_1.Generator.generateSalt(12);
    const options = {
        password: pass,
        salt: salt,
        rounds: ROUNDS
    };
    const derived1 = await Deriver_1.Deriver.deriveFromPassword(options);
    const derived2 = await Deriver_1.Deriver.deriveFromPassword(options);
    t.is(derived1, derived2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVyaXZlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0L0Rlcml2ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUFzQjtBQUN0QixrREFBOEM7QUFDOUMsOENBQTBDO0FBRTFDLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN6QixNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUU3QixNQUFNLElBQUksR0FBRyxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUE7QUFDckIsSUFBQSxhQUFJLEVBQUMsNEJBQTRCLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFFO0lBQzNDLHdCQUF3QjtJQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLHFCQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTdDLE1BQU0sSUFBSSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFN0MsTUFBTSxPQUFPLEdBQUc7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJO0tBQ0wsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUU5QyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUEsYUFBSSxFQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUNuQyx3QkFBd0I7SUFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxxQkFBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUU3QyxNQUFNLElBQUksR0FBRyxNQUFNLHFCQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTdDLE1BQU0sT0FBTyxHQUFHO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxNQUFNO0tBQ2YsQ0FBQTtJQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMxRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGlCQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFMUQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDMUIsQ0FBQyxDQUFDLENBQUEifQ==