import { Pokemon } from '../entities';
import { NumberInteger } from '../valueObjects';

export interface PokemonRepository {
  getAll(): Promise<Pokemon[]>;
  findByPokemonId(pokemonId: NumberInteger): Promise<Pokemon | undefined>;
  save(pokemon: Pokemon): Promise<void>;
  remove(pokemon: Pokemon): Promise<void>;
}
