import { v4 as uuidv4, validate } from 'uuid';

const securityValue = uuidv4();

export default class IdentityUuid {
  private constructor(value: string, secValue: any) {
    if (secValue !== securityValue) {
      throw new Error('Invalid Instantiation');
    }
    (this as any)[securityValue] = {
      value,
    };
  }

  public get value(): string {
    return (this as any)[securityValue].value;
  }

  public equals(value: IdentityUuid): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!(value instanceof IdentityUuid)) {
      return false;
    }
    return this.value === value.value;
  }

  public static create() {
    return this.createFromUuid(uuidv4());
  }

  public static createFromUuid(uuid: string) {
    if (!validate(uuid)) {
      throw new Error('Invalid UUID to IdentityUUID');
    }
    return new IdentityUuid(uuid, securityValue);
  }
}
