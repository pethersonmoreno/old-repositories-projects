import { PokemonRepository } from '../../repositories';
import {
  NumberInteger,
  PokemonName,
  PokemonType,
} from '../../valueObjects';
import { Pokemon } from '../../entities';

export type PokemonDTO = {
  pokemonId: number;
  name: string;
  type: string;
};

export default class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async register(newPokemonDto: PokemonDTO): Promise<void> {
    const pokemonId = NumberInteger.create(newPokemonDto.pokemonId);
    const name = PokemonName.create(newPokemonDto.name);
    const type = PokemonType.create(newPokemonDto.type as any);
    const pokemonById = await this.pokemonRepository.findByPokemonId(pokemonId);
    if (pokemonById) {
      throw new Error(`Already exists another pokemon with ID ${pokemonId.value}`);
    }
    const newPokemon = Pokemon.create({
      pokemonId,
      name,
      type,
    });
    await this.pokemonRepository.save(newPokemon);
  }
}
