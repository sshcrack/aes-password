export declare class AESEncryption {
    static readonly instance: AESEncryption;
    private generateIV;
    private constantTimeCompare;
    private generateSalt;
    private pbkdf2;
    private deriveFromPassword;
    encryptText(text: string, password: string): Promise<string>;
    decryptText(encryptedString: string, password: string): Promise<string>;
    static encrypt(plain: string, password: string): Promise<string>;
    static decrypt(encrypted: string, password: string): Promise<string>;
}
