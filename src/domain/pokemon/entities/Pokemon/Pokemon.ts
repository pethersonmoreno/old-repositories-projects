import { v4 as uuidv4 } from 'uuid';
import {
  NumberInteger,
  PokemonName,
  PokemonType,
  ValidPokemonType,
} from '../../valueObjects';

const securityValue = uuidv4();

type ValidPokemon = {
  pokemonId: NumberInteger;
  name: PokemonName;
  type: PokemonType;
};

export default class Pokemon {
  private constructor(value: ValidPokemon, secValue: any) {
    if (secValue !== securityValue) {
      throw new Error('Invalid Instantiation');
    }
    const { pokemonId, name, type } = value;
    (this as any)[securityValue] = {
      pokemonId,
      name,
      type,
    };
  }

  public get pokemonId(): NumberInteger {
    return (this as any)[securityValue].pokemonId;
  }

  public get name(): PokemonName {
    return (this as any)[securityValue].name;
  }

  public get type(): PokemonType {
    return (this as any)[securityValue].type;
  }

  public updateName(newName: string) {
    (this as any)[securityValue].name = PokemonName.create(newName);
  }

  public updateType(newType: ValidPokemonType) {
    (this as any)[securityValue].type = PokemonType.create(newType);
  }

  public equals(value: Pokemon): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!(value instanceof Pokemon)) {
      return false;
    }
    return this.pokemonId.equals(value.pokemonId);
  }
  public static create(value: ValidPokemon) {
    if (!(value.pokemonId instanceof NumberInteger)) {
      throw new Error('Invalid pokemonId');
    }
    if (!(value.name instanceof PokemonName)) {
      throw new Error('Invalid pokemon name');
    }
    if (!(value.type instanceof PokemonType)) {
      throw new Error('Invalid pokemon type');
    }
    return new Pokemon(value, securityValue);
  }
}
