import { v4 as uuidv4 } from 'uuid';

const securityValue = uuidv4();

type ValidRole = 'Administrator' | 'PokemonTrainer';
const listValidRoles = [
  'Administrator',
  'PokemonTrainer'
];

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

  public static create(value: ValidRole) {
    if (!listValidRoles.find((item) => item === value)) {
      throw new Error('Invalid Role');
    }
    return new Role(value, securityValue);
  }

  public static createAdministrator() {
    return this.create('Administrator');
  }

  public static createPokemonTrainer() {
    return this.create('PokemonTrainer');
  }
}
