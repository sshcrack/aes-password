import crypto from 'crypto';
import test from 'ava';
import { AESEncryption } from './AES';
const strLength = 20;
test('SYNC: Encrypt', (t) => {
    const key = randomString();
    const str = randomString(strLength);
    try {
        const encrypted = AESEncryption.encryptSync(str, key);
        t.pass(`Encrypted text is ${encrypted}, plain ${str}`);
    }
    catch (err) {
        t.fail(err);
    }
});
test('SYNC: Encrypt & Decrypt', (t) => {
    const key = randomString();
    const str = randomString(strLength);
    try {
        const encrypted = AESEncryption.encryptSync(str, key);
        const decrypted = AESEncryption.decryptSync(encrypted, key);
        t.true(str === decrypted);
    }
    catch (err) {
        t.fail(err);
    }
});
function randomString(length = 50) {
    return crypto.randomBytes(length).toString('base64');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3luY2hyb25vdXMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvU3luY2hyb25vdXMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFdEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMxQixNQUFNLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUMzQixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEMsSUFBSTtRQUNGLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXRELENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLFNBQVMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQzNCLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwQyxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFNUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUM7S0FDM0I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUU7SUFDL0IsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RCxDQUFDIn0=