/// <reference types="node" />
export declare class Deriver {
    static pbkdf2({ password, salt, rounds, bits }: pbkdf2Input): Promise<Buffer>;
    static deriveFromPassword({ password, salt, rounds }: DeriveIn): Promise<DeriveOut>;
}
declare type pbkdf2Input = {
    readonly password: string;
    readonly salt: string;
    readonly rounds: number;
    readonly bits: number;
};
declare type DeriveIn = {
    readonly password: string;
    readonly salt: string;
    readonly rounds: number;
};
declare type DeriveOut = {
    readonly salt: string;
    readonly key: Buffer;
    readonly rounds: number;
    readonly hmac: Buffer;
};
export {};
