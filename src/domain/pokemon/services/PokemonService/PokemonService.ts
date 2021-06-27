import { PokemonRepository } from '../../repositories';
import { NumberInteger, PokemonName, PokemonType } from '../../valueObjects';
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
      throw new Error(
        `Already exists another pokemon with ID ${pokemonId.value}`,
      );
    }
    const newPokemon = Pokemon.create({
      pokemonId,
      name,
      type,
    });
    await this.pokemonRepository.save(newPokemon);
  }

  async update(updatePokemonDto: PokemonDTO): Promise<void> {
    const pokemonId = NumberInteger.create(updatePokemonDto.pokemonId);
    const pokemon = await this.pokemonRepository.findByPokemonId(pokemonId);
    if (!pokemon) {
      throw new Error(
        `Pokemon not found with ID ${updatePokemonDto.pokemonId}`,
      );
    }
    pokemon.updateName(updatePokemonDto.name);
    pokemon.updateType(updatePokemonDto.type as any);
    await this.pokemonRepository.save(pokemon);
  }

  async remove(pokemonId: number): Promise<void> {
    const pokemonIdObj = NumberInteger.create(pokemonId);
    const pokemon = await this.pokemonRepository.findByPokemonId(pokemonIdObj);
    if (!pokemon) {
      throw new Error(`Pokemon not found with ID ${pokemonId}`);
    }
    await this.pokemonRepository.remove(pokemon);
  }
}
