"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackageComponents = exports.packageComponents = void 0;
const encryptorID = 'AES_PASS_ENCRYPTOR';
function packageComponents(encryptedContent, { m, h, i, s, r }) {
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
        m: m,
        h: h,
        i: i,
        s: s,
        r: parseInt(r, 10),
        encryptedContent: encryptedContent,
    };
    return components;
}
exports.unpackageComponents = unpackageComponents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL1BhY2thZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBRXpDLFNBQWdCLGlCQUFpQixDQUMvQixnQkFBd0IsRUFDeEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFzQjtJQUVyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFFakYsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBUEQsOENBT0M7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxHQUFXO0lBQzdDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRWxELE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLElBQUksU0FBUyxLQUFLLFdBQVc7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0lBRXZFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxNQUFNLFVBQVUsR0FBeUI7UUFDdkMsQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDbEIsZ0JBQWdCLEVBQUUsZ0JBQWdCO0tBQ25DLENBQUM7SUFFRixPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBbEJELGtEQWtCQyJ9