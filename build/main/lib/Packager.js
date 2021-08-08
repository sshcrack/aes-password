"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackageComponents = exports.packageComponents = void 0;
const encryptorID = 'AES_PASS_ENCRYPTOR';
function packageComponents(encryptedContent, { m, h, i, s, r }) {
    const formatted = `$${encryptorID}$${m},${h},${i},${s},${r}$${encryptedContent}`;
    return formatted;
}
exports.packageComponents = packageComponents;
function unpackageComponents(raw) {
    const [, encryptor, componentsStr, encryptedContent] = raw.split('$');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL1BhY2thZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBRXpDLFNBQWdCLGlCQUFpQixDQUMvQixnQkFBd0IsRUFDeEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFzQjtJQUVyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFFakYsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVBELDhDQU9DO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsR0FBVztJQUM3QyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RSxJQUFJLFNBQVMsS0FBSyxXQUFXO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUV2RSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsTUFBTSxVQUFVLEdBQXlCO1FBQ3ZDLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xCLGdCQUFnQixFQUFFLGdCQUFnQjtLQUNuQyxDQUFDO0lBRUYsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQWhCRCxrREFnQkMifQ==