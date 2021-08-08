export declare function packageComponents(encryptedContent: string, { m, h, i, s, r }: PackagedComponents): string;
export declare function unpackageComponents(raw: string): UnPackagedComponents;
export declare type PackagedComponents = {
    readonly m: string;
    readonly h: string;
    readonly i: string;
    readonly s: string;
    readonly r: number;
};
export declare type UnPackagedComponents = PackagedComponents & {
    readonly encryptedContent: string;
};
