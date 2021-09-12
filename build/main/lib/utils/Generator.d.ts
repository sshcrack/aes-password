/// <reference types="node" />
export declare class Generator {
    static generateSalt(length: number): Promise<string>;
    static generateIV(): Promise<Buffer>;
}
