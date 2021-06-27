import { v4 as uuidv4 } from 'uuid';

const securityValue = uuidv4();

type ValidRole = 'Administrator' | 'PokemonTrainer';

export default class Role {
  private constructor(value: ValidRole, secValue: any) {
    if (secValue !== securityValue) {
      throw new Error('Invalid Instantiation');
    }
    (this as any)[securityValue] = {
      value,
    };
  }

  public get value(): ValidRole {
    return (this as any)[securityValue].value;
  }

  public equals(value: Role): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!(value instanceof Role)) {
      return false;
    }
    return this.value === value.value;
  }

  private static create(value: ValidRole, secValue: any) {
    return new Role(value, secValue);
  }

  public static createAdministrator() {
    return this.create('Administrator', securityValue);
  }

  public static createPokemonTrainer() {
    return this.create('PokemonTrainer', securityValue);
  }
}
