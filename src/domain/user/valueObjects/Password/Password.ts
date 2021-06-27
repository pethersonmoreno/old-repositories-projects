import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const securityValue = uuidv4();
const salt = bcrypt.genSaltSync();

export default class Password {

    private constructor(hash: string, secValue: any) {
        if (secValue !== securityValue) {
            throw new Error("Invalid Instantiation")
        }
        (this as any)[securityValue] = {
            hash
        };
    }

    public get hash(): string {
        return (this as any)[securityValue].hash;
    }

    public equals(value: Password): boolean {
        if (value === null || value === undefined) {
            return false;
        }
        if (!(value instanceof Password)) {
            return false;
        }
        return this.hash === value.hash;
    }

    public static create(password: string) {
        const regexStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (!regexStrongPassword.test(password)) {
            throw new Error("Invalid Password, it must have at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, 1 special character and 8 characters or longer");
        }
        const hash = bcrypt.hashSync(password, salt);
        return new Password(hash, securityValue);
    }

    public static createFromHash(hash: string) {
        return new Password(hash, securityValue);
    }
}