/// <reference types="node" />
export declare class Deriver {
    static pbkdf2({ password, salt, rounds, bits }: pbkdf2Input): Promise<Buffer>;
    static deriveFromPassword({ password, salt, rounds }: DeriveIn): Promise<DeriveOut>;
}
declare type pbkdf2Input = {
    password: string;
    salt: string;
    rounds: number;
    bits: number;
};
declare type DeriveIn = {
    password: string;
    salt: string;
    rounds: number;
};
declare type DeriveOut = {
    readonly salt: string;
    readonly key: Buffer;
    readonly rounds: number;
    readonly hmac: Buffer;
};
export {};
