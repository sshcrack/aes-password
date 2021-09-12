"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const Packager_1 = require("../utils/Packager");
const encryptedPackager = "Encrypted";
const info = {
    method: "cbc",
    hmacHex: "ThisIsJustATestHmac",
    iv: "ThisIsAnIv",
    salt: "ASaltYay!",
    rounds: 50
};
let packaged;
(0, ava_1.default)("Package", t => {
    packaged = (0, Packager_1.packageComponents)(encryptedPackager, info);
    t.pass("Can package");
});
(0, ava_1.default)("Unpackage", t => {
    const unpackaged = (0, Packager_1.unpackageComponents)(packaged);
    t.is(unpackaged, Object.assign({ encryptedContent: encryptedPackager }, info));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdC9QYWNrYWdlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBRXZCLGdEQUEyRTtBQUUzRSxNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQTtBQUNyQyxNQUFNLElBQUksR0FBRztJQUNYLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixFQUFFLEVBQUUsWUFBWTtJQUNoQixJQUFJLEVBQUUsV0FBVztJQUNqQixNQUFNLEVBQUUsRUFBRTtDQUNYLENBQUE7QUFFRCxJQUFJLFFBQWdCLENBQUM7QUFDckIsSUFBQSxhQUFJLEVBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2xCLFFBQVEsR0FBRyxJQUFBLDRCQUFpQixFQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFBO0lBRXJELENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFBLGFBQUksRUFBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDcEIsTUFBTSxVQUFVLEdBQUcsSUFBQSw4QkFBbUIsRUFBQyxRQUFRLENBQUMsQ0FBQTtJQUVoRCxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsa0JBQ2IsZ0JBQWdCLEVBQUUsaUJBQWlCLElBQ2hDLElBQUksRUFDUCxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==