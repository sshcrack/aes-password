"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deriver = void 0;
const crypto_1 = require("crypto");
const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;
class Deriver {
    static pbkdf2({ password, salt, rounds, bits }) {
        return new Promise((resolve, reject) => {
            (0, crypto_1.pbkdf2)(password, salt, rounds, bits / 8, 'sha256', (err, key) => {
                if (err)
                    return reject(err);
                resolve(key);
            });
        });
    }
    static deriveFromPassword({ password, salt, rounds }) {
        return new Promise(async (resolve, reject) => {
            const bits = (PASSWORD_KEY_SIZE + HMAC_KEY_SIZE) * 8;
            if (!password)
                reject(new Error('Failed deriving key: Password must be provided'));
            if (!salt)
                reject(new Error('Failed deriving key: Salt must be provided'));
            if (!rounds || rounds <= 0 || typeof rounds !== 'number')
                reject(new Error('Failed deriving key: Rounds must be greater than 0'));
            try {
                const raw = await this.pbkdf2({ password, salt, rounds, bits });
                const derivedKeyHex = raw.toString('hex');
                const dkhLength = derivedKeyHex.length;
                const keyBuffer = Buffer.from(derivedKeyHex.substr(0, dkhLength / 2), 'hex');
                const hmacHex = Buffer.from(derivedKeyHex.substr(dkhLength / 2, dkhLength / 2), 'hex');
                resolve({
                    salt: salt,
                    key: keyBuffer,
                    rounds: rounds,
                    hmac: hmacHex,
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.Deriver = Deriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdXRpbHMvRGVyaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBNEM7QUFFNUMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBRzdCLE1BQWEsT0FBTztJQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFDbkIsUUFBUSxFQUNSLElBQUksRUFDSixNQUFNLEVBQ04sSUFBSSxFQUNRO1FBQ1osT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFBLGVBQVMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDakUsSUFBSSxHQUFHO29CQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU1QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUdNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUMvQixRQUFRLEVBQ1IsSUFBSSxFQUNKLE1BQU0sRUFDRztRQUNULE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksR0FBRyxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsUUFBUTtnQkFDWCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQyxDQUFDO1lBRXRFLElBQUksQ0FBQyxJQUFJO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUM7WUFFbEUsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7Z0JBQ3RELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDLENBQUM7WUFFMUUsSUFBSTtnQkFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUxQyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO2dCQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUMzQixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ3RDLEtBQUssQ0FDTixDQUFDO2dCQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQ3pCLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ2xELEtBQUssQ0FDTixDQUFDO2dCQUVGLE9BQU8sQ0FBQztvQkFDTixJQUFJLEVBQUUsSUFBSTtvQkFDVixHQUFHLEVBQUUsU0FBUztvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUUsT0FBTztpQkFDZCxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNWO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExREQsMEJBMERDIn0=