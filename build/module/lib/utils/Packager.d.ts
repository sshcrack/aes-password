export declare function packageComponents(encryptedContent: string, { method: m, hmacHex: h, iv: i, salt: s, rounds: r }: PackagedComponents): string;
export declare function unpackageComponents(raw: string): UnPackagedComponents;
export declare type PackagedComponents = {
    readonly method: string;
    readonly hmacHex: string;
    readonly iv: string;
    readonly salt: string;
    readonly rounds: number;
};
export declare type UnPackagedComponents = PackagedComponents & {
    readonly encryptedContent: string;
};
