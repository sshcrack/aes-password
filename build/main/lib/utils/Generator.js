"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Generator {
    static async generateSalt(length) {
        if (length <= 0)
            throw new Error(`Failed generating salt: Invalid length supplied: ${length}`);
        let output = '';
        while (output.length < length) {
            output += crypto_1.default.randomBytes(3).toString('base64');
            if (output.length > length) {
                output = output.substr(0, length);
            }
        }
        return output;
    }
    static async generateIV() {
        return Promise.resolve(Buffer.from(crypto_1.default.randomBytes(16)));
    }
}
exports.Generator = Generator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi91dGlscy9HZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTJCO0FBRTNCLE1BQWEsU0FBUztJQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWM7UUFDN0MsSUFBSSxNQUFNLElBQUksQ0FBQztZQUNiLE1BQU0sSUFBSSxLQUFLLENBQ2Isb0RBQW9ELE1BQU0sRUFBRSxDQUM3RCxDQUFDO1FBRUosSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDN0IsTUFBTSxJQUFJLGdCQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO2dCQUMxQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDbkM7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVU7UUFDNUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRjtBQXJCRCw4QkFxQkMifQ==