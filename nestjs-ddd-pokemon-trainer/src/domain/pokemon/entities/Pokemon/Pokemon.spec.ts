import { NumberInteger, PokemonName, PokemonType } from '../../valueObjects';
import Pokemon from './Pokemon';

const testInteger = NumberInteger.create(1);
const testPokemonName = PokemonName.create('Pikachu');
const testPokemonType = PokemonType.create('Electric');

describe('Pokemon', () => {
  it('should not create Pokemon directly', () => {
    expect(() => {
      new (Pokemon as any)();
    }).toThrow();
    expect(() => {
      new (Pokemon as any)({
        pokemonId: testInteger,
        name: testPokemonName,
        type: testPokemonType,
      });
    }).toThrow();
  });

  it('should not throw create Pokemon with create static method', () => {
    expect(() => {
      Pokemon.create({
        pokemonId: testInteger,
        name: testPokemonName,
        type: testPokemonType,
      });
    }).not.toThrow();
  });

  it('create method should create with same values used in parameters', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(pokemon.pokemonId).toBe(testInteger);
    expect(pokemon.name).toBe(testPokemonName);
    expect(pokemon.type).toBe(testPokemonType);
  });

  it('should not change a value of Pokemon object', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(() => {
      (pokemon as any).pokemonId = 3;
    }).toThrow();
    expect(() => {
      (pokemon as any).name = 'other value';
    }).toThrow();
    expect(() => {
      (pokemon as any).type = 'other value';
    }).toThrow();
  });

  it('should not be equal to null', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(pokemon.equals(null)).toBeFalsy();
  });

  it('should not be equal to undefined', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(pokemon.equals(undefined)).toBeFalsy();
  });

  it('should not be equal to a simple object with same ID', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    const pokemonSimpleObj = { pokemonId: pokemon.pokemonId };
    expect(pokemon.equals(pokemonSimpleObj as any)).toBeFalsy();
  });

  it('should not be equal to a different Pokemon ID', () => {
    const pokemon1 = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    const pokemon2 = Pokemon.create({
      pokemonId: NumberInteger.create(2),
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(pokemon1.equals(pokemon2)).toBeFalsy();
  });

  it('should be equal to Pokemons with same pokemon ID', () => {
    const pokemon1 = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    const pokemon2 = Pokemon.create({
      pokemonId: pokemon1.pokemonId,
      name: PokemonName.create('Bubassauro'),
      type: PokemonType.create('Water'),
    });
    expect(pokemon1.equals(pokemon2)).toBeTruthy();
  });

  it('should be equal to same Pokemon where pokemonId are different objects', () => {
    const pokemon1 = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    const pokemon2 = Pokemon.create({
      pokemonId: NumberInteger.create(pokemon1.pokemonId.value),
      name: PokemonName.create('Bubassauro'),
      type: PokemonType.create('Water'),
    });
    expect(pokemon1.equals(pokemon2)).toBeTruthy();
  });

  it('should not update name with invalid name', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(() => {
      pokemon.updateName('Pikachu2');
    }).toThrow();
  });

  it('should update name with valid name', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(() => {
      pokemon.updateName('Bubassauro');
    }).not.toThrow();
    expect(pokemon.name.value).toBe('Bubassauro');
  });

  it('should not update type with invalid type', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(() => {
      pokemon.updateType('Space' as any);
    }).toThrow();
  });

  it('should update type with valid type', () => {
    const pokemon = Pokemon.create({
      pokemonId: testInteger,
      name: testPokemonName,
      type: testPokemonType,
    });
    expect(() => {
      pokemon.updateType('Water');
    }).not.toThrow();
    expect(pokemon.type.value).toBe('Water');
  });
});
