import { v4 as uuidv4 } from 'uuid';

const securityValue = uuidv4();

export default class Nickname {
    private constructor(value: string, secValue: any) {
        if (secValue !== securityValue) {
            throw new Error("Invalid Instantiation")
        }
        (this as any)[securityValue] = {
            value
        };
    }

    public get value(): string {
        return (this as any)[securityValue].value;
    }

    public equals(value: Nickname): boolean {
        if (value === null || value === undefined) {
            return false;
        }
        if (!(value instanceof Nickname)) {
            return false;
        }
        return this.value === value.value;
    }

    public static create(value: string) {
        return new Nickname(value, securityValue);
    }
}