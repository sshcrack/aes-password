import { pbkdf2 as deriveKey } from "crypto";
const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;
export class Deriver {
    static pbkdf2({ password, salt, rounds, bits }) {
        return new Promise((resolve, reject) => {
            deriveKey(password, salt, rounds, bits / 8, 'sha256', (err, key) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdXRpbHMvRGVyaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLFNBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUU1QyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFHN0IsTUFBTSxPQUFPLE9BQU87SUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQ25CLFFBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNOLElBQUksRUFDUTtRQUNaLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNqRSxJQUFJLEdBQUc7b0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR00sTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQy9CLFFBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNHO1FBQ1QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0sSUFBSSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLENBQUM7WUFFdEUsSUFBSSxDQUFDLElBQUk7Z0JBQ1AsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsQ0FBQztZQUVsRSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtnQkFDdEQsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUMsQ0FBQztZQUUxRSxJQUFJO2dCQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTFDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQzNCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFDdEMsS0FBSyxDQUNOLENBQUM7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDekIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFDbEQsS0FBSyxDQUNOLENBQUM7Z0JBRUYsT0FBTyxDQUFDO29CQUNOLElBQUksRUFBRSxJQUFJO29CQUNWLEdBQUcsRUFBRSxTQUFTO29CQUNkLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxPQUFPO2lCQUNkLENBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ1Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiJ9