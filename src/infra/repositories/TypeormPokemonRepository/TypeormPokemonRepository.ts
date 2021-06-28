import { getRepository, Repository } from 'typeorm';
import {
  NumberInteger,
  Pokemon as PokemonEntity,
  PokemonName,
  PokemonRepository,
  PokemonType,
} from '../../../domain/pokemon';
import PokemonTypeorm from '../entities/Pokemon';

export default class TypeormPokemonRepository implements PokemonRepository {
  private pokemonRepositoryTypeorm: Repository<PokemonTypeorm>;
  constructor() {
    this.pokemonRepositoryTypeorm = getRepository(PokemonTypeorm);
  }

  async getAll(): Promise<PokemonEntity[]> {
    const allPokemons = await this.pokemonRepositoryTypeorm.find();
    return allPokemons.map((item) => this.convertToEntity(item));
  }

  async findByPokemonId(pokemonId: NumberInteger): Promise<PokemonEntity> {
    const pokemonById = await this.pokemonRepositoryTypeorm.findOne({
      where: { pokemonId: pokemonId.value },
    });
    if (!pokemonById) {
      return undefined;
    }
    return this.convertToEntity(pokemonById);
  }

  async save(pokemon: PokemonEntity): Promise<void> {
    const pokemonById = await this.pokemonRepositoryTypeorm.findOne({
      where: { pokemonId: pokemon.pokemonId.value },
    });
    if (!pokemonById) {
      await this.insert(pokemon);
      return;
    }
    await this.update(pokemon, pokemonById._id);
  }

  private async insert(pokemon: PokemonEntity) {
    await this.pokemonRepositoryTypeorm.insert(this.convertFromEntity(pokemon));
  }

  private async update(pokemon: PokemonEntity, _id: string) {
    await this.pokemonRepositoryTypeorm.save({
      ...this.convertFromEntity(pokemon),
      _id,
    });
  }

  async remove(pokemon: PokemonEntity): Promise<void> {
    const pokemonById = await this.pokemonRepositoryTypeorm.findOne({
      where: { pokemonId: pokemon.pokemonId.value },
    });
    await this.pokemonRepositoryTypeorm.remove(pokemonById);
  }

  private convertToEntity(pokemon: PokemonTypeorm): PokemonEntity {
    return PokemonEntity.create({
      pokemonId: NumberInteger.create(pokemon.pokemonId),
      name: PokemonName.create(pokemon.name),
      type: PokemonType.create(pokemon.type as any),
    });
  }

  private convertFromEntity(pokemon: PokemonEntity) {
    return {
      pokemonId: pokemon.pokemonId.value,
      name: pokemon.name.value,
      type: pokemon.type.value,
    };
  }
}
