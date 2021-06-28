import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from '../../../../shared/errors';

const securityValue = uuidv4();

export type ValidPokemonType =
  | 'Normal'
  | 'Fighting'
  | 'Flying'
  | 'Poison'
  | 'Ground'
  | 'Rock'
  | 'Bug'
  | 'Ghost'
  | 'Steel'
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Electric'
  | 'Psychic'
  | 'Ice'
  | 'Dragon'
  | 'Fairy'
  | 'Dark';

const listValidPokemonTypes = [
  'Normal',
  'Fighting',
  'Flying',
  'Poison',
  'Ground',
  'Rock',
  'Bug',
  'Ghost',
  'Steel',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Psychic',
  'Ice',
  'Dragon',
  'Fairy',
  'Dark',
];

export default class PokemonType {
  private constructor(value: ValidPokemonType, secValue: any) {
    if (secValue !== securityValue) {
      throw new ValidationError('Invalid Instantiation');
    }
    (this as any)[securityValue] = {
      value,
    };
  }

  public get value(): ValidPokemonType {
    return (this as any)[securityValue].value;
  }

  public equals(value: PokemonType): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!(value instanceof PokemonType)) {
      return false;
    }
    return this.value === value.value;
  }

  public static create(value: ValidPokemonType) {
    if (!listValidPokemonTypes.find((item) => item === value)) {
      throw new ValidationError('Invalid Pokemon Type');
    }
    return new PokemonType(value, securityValue);
  }
}
