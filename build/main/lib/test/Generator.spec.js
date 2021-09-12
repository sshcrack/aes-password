"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const Generator_1 = require("../utils/Generator");
(0, ava_1.default)("IV is 16 bytes long", async (t) => {
    const iv = await Generator_1.Generator.generateIV();
    t.is(iv.length, 16);
});
(0, ava_1.default)("Salt generates specified length", async (t) => {
    const randomNumber = Math.round(Math.random()) * 100;
    const salt = await Generator_1.Generator.generateSalt(randomNumber);
    t.is(salt.length, randomNumber);
});
(0, ava_1.default)("Salt fails on wrong arguments", t => {
    Generator_1.Generator.generateSalt(0)
        .then(() => t.fail())
        .catch(() => t.pass());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3QvR2VuZXJhdG9yLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIsa0RBQThDO0FBRTlDLElBQUEsYUFBSSxFQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUNwQyxNQUFNLEVBQUUsR0FBRyxNQUFNLHFCQUFTLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFdkMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3JCLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBQSxhQUFJLEVBQUMsaUNBQWlDLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFFO0lBQ2hELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBO0lBQ3BELE1BQU0sSUFBSSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBQSxhQUFJLEVBQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDeEMscUJBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQzFCLENBQUMsQ0FBQyxDQUFBIn0=