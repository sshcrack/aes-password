export declare class AESEncryption {
    static encrypt(text: string, password: string): Promise<string>;
    static decrypt(encryptedString: string, password: string): Promise<string>;
}
