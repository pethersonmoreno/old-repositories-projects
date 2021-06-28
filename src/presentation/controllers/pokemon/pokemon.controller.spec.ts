import { Test, TestingModule } from '@nestjs/testing';
import {
  NumberInteger,
  Pokemon,
  PokemonRepository,
} from '../../../domain/pokemon';
import { PokemonController } from './pokemon.controller';

class MemoryPokemonRepository implements PokemonRepository {
  private allPokemons: Pokemon[];
  constructor() {
    this.allPokemons = [];
  }
  getAll(): Promise<Pokemon[]> {
    return Promise.resolve(
      this.allPokemons.map((item) => this.cloneIfDefined(item)),
    );
  }
  findByPokemonId(pokemonId: NumberInteger): Promise<Pokemon> {
    return Promise.resolve(
      this.cloneIfDefined(
        this.allPokemons.find((pokemon) => pokemon.pokemonId.equals(pokemonId)),
      ),
    );
  }
  async save(pokemon: Pokemon): Promise<void> {
    const currentPokemon = await this.findByPokemonId(pokemon.pokemonId);
    if (currentPokemon) {
      this.allPokemons = this.allPokemons.map((itemPokemon) => {
        if (itemPokemon.equals(pokemon)) {
          return this.cloneIfDefined(pokemon);
        }
        return itemPokemon;
      });
    } else {
      this.allPokemons = [...this.allPokemons, this.cloneIfDefined(pokemon)];
    }
  }
  async remove(pokemon: Pokemon): Promise<void> {
    this.allPokemons = this.allPokemons.filter(
      (pokemonItem) => !pokemonItem.pokemonId.equals(pokemon.pokemonId),
    );
  }

  private cloneIfDefined(pokemon?: Pokemon) {
    if (!pokemon) {
      return undefined;
    }
    return Pokemon.create({
      pokemonId: pokemon.pokemonId,
      name: pokemon.name,
      type: pokemon.type,
    });
  }
}

describe('PokemonController', () => {
  let controller: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: 'PokemonRepository',
          useClass: MemoryPokemonRepository,
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
