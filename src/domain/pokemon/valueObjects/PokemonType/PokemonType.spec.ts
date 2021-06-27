import PokemonType from './PokemonType';

describe('PokemonType', () => {
  it('should not create PokemonType directly', () => {
    expect(() => {
      new (PokemonType as any)();
    }).toThrow();
    expect(() => {
      new (PokemonType as any)('Normal');
    }).toThrow();
  });

  it('should create PokemonType Normal with create static method', () => {
    expect(() => {
      (PokemonType as any).create('Normal');
    }).not.toThrow();
  });

  it('should not create invalid PokemonType with create static method', () => {
    expect(() => {
      (PokemonType as any).create('Invalidtype');
    }).toThrow();
  });


  it('createNormal should create with value Normal', () => {
    expect((PokemonType.create('Normal') as any).value).toBe('Normal');
  });

  it('should not change a value of PokemonType object', () => {
    const pokemonType = PokemonType.create('Normal');
    expect(() => {
      (pokemonType as any).value = 'Fighting';
    }).toThrow();
  });

  it('should not be equal to null', () => {
    const pokemonType = PokemonType.create('Normal');
    expect(pokemonType.equals(null)).toBeFalsy();
  });

  it('should not be equal to undefined', () => {
    const pokemonType = PokemonType.create('Normal');
    expect(pokemonType.equals(undefined)).toBeFalsy();
  });

  it('should not be equal to a simple object with same value', () => {
    const pokemonType = PokemonType.create('Normal');
    const pokemonTypeSimpleObj = { value: 'Normal' };
    expect(pokemonType.value).toBe('Normal');
    expect(pokemonTypeSimpleObj.value).toBe('Normal');
    expect(pokemonType.equals(pokemonTypeSimpleObj as any)).toBeFalsy();
  });

  it('should not be equal to a different PokemonType', () => {
    const pokemonType = PokemonType.create('Normal');
    expect(pokemonType.equals(PokemonType.create('Dark'))).toBeFalsy();
  });

  it('should be equal to same PokemonType', () => {
    expect(
      PokemonType.create('Normal').equals(PokemonType.create('Normal')),
    ).toBeTruthy();
  });
});
