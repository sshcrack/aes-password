import { packageComponents, unpackageComponents } from '../utils/Packager';
import test from 'ava';
const encryptedPackager = "Encrypted";
const info = {
    method: "cbc",
    hmacHex: "ThisIsJustATestHmac",
    iv: "ThisIsAnIv",
    salt: "ASaltYay!",
    rounds: 50
};
let packaged;
test("Package", t => {
    packaged = packageComponents(encryptedPackager, info);
    t.pass("Can package");
});
test("Unpackage", t => {
    const unpackaged = unpackageComponents(packaged);
    t.is(unpackaged, {
        encryptedContent: encryptedPackager,
        ...info
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFja2FnZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdGVzdC9QYWNrYWdlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNFLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQztBQUV2QixNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQTtBQUNyQyxNQUFNLElBQUksR0FBRztJQUNYLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLHFCQUFxQjtJQUM5QixFQUFFLEVBQUUsWUFBWTtJQUNoQixJQUFJLEVBQUUsV0FBVztJQUNqQixNQUFNLEVBQUUsRUFBRTtDQUNYLENBQUE7QUFFRCxJQUFJLFFBQWdCLENBQUM7QUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNsQixRQUFRLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDcEIsTUFBTSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7UUFDZixnQkFBZ0IsRUFBRSxpQkFBaUI7UUFDbkMsR0FBRyxJQUFJO0tBQ1IsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==