"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackageComponents = exports.packageComponents = void 0;
const encryptorID = 'AES_PASS_ENCRYPTOR';
function packageComponents(encryptedContent, { method: m, hmacHex: h, iv: i, salt: s, rounds: r }) {
    const formatted = `$${encryptorID}$${m},${h},${i},${s},${r}$${encryptedContent}`;
    return Buffer.from(formatted).toString('base64');
}
exports.packageComponents = packageComponents;
function unpackageComponents(raw) {
    const str = Buffer.from(raw, 'base64').toString();
    const [, encryptor, componentsStr, encryptedContent] = str.split('$');
    if (encryptor !== encryptorID)
        throw new Error('Failed decrypting: unrecognized encrypted payload');
    const [m, h, i, s, r] = componentsStr.split(',');
    const components = {
        method: m,
        hmacHex: h,
        iv: i,
        salt: s,
        rounds: parseInt(r, 10),
        encryptedContent: encryptedContent,
    };
    return components;
}
exports.unpackageComponents = unpackageComponents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3V0aWxzL1BhY2thZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBRXpDLFNBQWdCLGlCQUFpQixDQUMvQixnQkFBd0IsRUFDeEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQXNCO0lBRXhFLE1BQU0sU0FBUyxHQUFHLElBQUksV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUVqRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFQRCw4Q0FPQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLEdBQVc7SUFDN0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFbEQsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEUsSUFBSSxTQUFTLEtBQUssV0FBVztRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7SUFFdkUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sVUFBVSxHQUF5QjtRQUN2QyxNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDO1FBQ1YsRUFBRSxFQUFFLENBQUM7UUFDTCxJQUFJLEVBQUUsQ0FBQztRQUNQLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2QixnQkFBZ0IsRUFBRSxnQkFBZ0I7S0FDbkMsQ0FBQztJQUVGLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFsQkQsa0RBa0JDIn0=