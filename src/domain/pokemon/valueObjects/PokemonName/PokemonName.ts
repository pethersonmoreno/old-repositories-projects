import { v4 as uuidv4 } from 'uuid';

const securityValue = uuidv4();

export default class PokemonName {
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

  public equals(value: PokemonName): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!(value instanceof PokemonName)) {
      return false;
    }
    return this.value === value.value;
  }

  public static create(value: string) {
    const regexPokemonName =
      /^[A-Za-z]{3,}( [A-Za-z]{3,})*$/;
    if (!regexPokemonName.test(value)) {
      throw new Error('Invalid Pokemon Name');
    }
    return new PokemonName(value, securityValue);
  }
}
