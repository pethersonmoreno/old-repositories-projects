import PokemonName from './PokemonName';

describe('PokemonName', () => {
  it('should not create PokemonName directly', () => {
    expect(() => {
      new (PokemonName as any)();
    }).toThrow();
    expect(() => {
      new (PokemonName as any)('PokemonName');
    }).toThrow();
  });

  it('should not throw create PokemonName with create static method', () => {
    expect(() => {
      PokemonName.create('PokemonName');
    }).not.toThrow();
  });

  it('create method should create with same value used in parameter', () => {
    expect(PokemonName.create('PokemonName').value).toBe('PokemonName');
  });

  it('should not change a value of PokemonName object', () => {
    const pokemonName = PokemonName.create('PokemonName');
    expect(() => {
      (pokemonName as any).value = 'Othername';
    }).toThrow();
  });

  it('should not be equal to null', () => {
    const pokemonName = PokemonName.create('PokemonName');
    expect(pokemonName.equals(null)).toBeFalsy();
  });

  it('should not be equal to undefined', () => {
    const pokemonName = PokemonName.create('PokemonName');
    expect(pokemonName.equals(undefined)).toBeFalsy();
  });

  it('should not be equal to a simple object with same value', () => {
    const pokemonName = PokemonName.create('PokemonName');
    const pokemonNameSimpleObj = { value: 'PokemonName' };
    expect(pokemonName.value).toBe('PokemonName');
    expect(pokemonNameSimpleObj.value).toBe('PokemonName');
    expect(pokemonName.equals(pokemonNameSimpleObj as any)).toBeFalsy();
  });

  it('should not be equal to a different PokemonName', () => {
    const pokemonName1 = PokemonName.create('PokemonName');
    const pokemonName2 = PokemonName.create('Othername');
    expect(pokemonName1.equals(pokemonName2)).toBeFalsy();
  });

  it('should be equal to same PokemonName', () => {
    const pokemonName1 = PokemonName.create('PokemonName');
    const pokemonName2 = PokemonName.create('PokemonName');
    expect(pokemonName1.equals(pokemonName2)).toBeTruthy();
  });

  it('should throw if is used an invalid pokemonName', () => {
    const invalidPokemonNames = [
      'S',
      'V',
      'Ca',
      'C@s',
      'Ca@',
      '1as',
      'Ca1',
      'C0s',
      'Upa ',
      'Upa E',
      'Upa En',
      'Upa 2nb',
      'Upa E7b',
      'Upa En9',
    ];
    invalidPokemonNames.forEach((invalidPokemonName) => {
      expect(() => {
        PokemonName.create(invalidPokemonName);
      }).toThrow();
    });
  });
});
