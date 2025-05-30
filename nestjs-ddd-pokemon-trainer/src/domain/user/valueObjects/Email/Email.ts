import { v4 as uuidv4 } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import { ValidationError } from '../../../../shared/errors';

const securityValue = uuidv4();

export default class Email {
  private constructor(value: string, secValue: any) {
    if (secValue !== securityValue) {
      throw new ValidationError('Invalid Instantiation');
    }
    (this as any)[securityValue] = {
      value,
    };
  }

  public get value(): string {
    return (this as any)[securityValue].value;
  }

  public equals(value: Email): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!(value instanceof Email)) {
      return false;
    }
    return this.value === value.value;
  }

  public static create(value: string) {
    const options = {
      allow_display_name: false,
      require_display_name: false,
      allow_utf8_local_part: true,
      require_tld: true,
      ignore_max_length: false,
      allow_ip_domain: false,
      domain_specific_validation: true,
    };
    if (!isEmail(value, options)) {
      throw new ValidationError('Invalid Email addresss');
    }
    return new Email(value, securityValue);
  }
}
