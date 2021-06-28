import Role from './Role';

describe('Role', () => {
  it('should not create Role directly', () => {
    expect(() => {
      new (Role as any)();
    }).toThrow();
    expect(() => {
      new (Role as any)('Administrator');
    }).toThrow();
  });

  it('should create Role Administrator with create static method', () => {
    expect(() => {
      (Role as any).create('Administrator');
    }).not.toThrow();
  });

  it('should create Role Pokemon Trainer with create static method', () => {
    expect(() => {
      (Role as any).create('PokemonTrainer');
    }).not.toThrow();
  });

  it('should not create Role with create static method using invalid value', () => {
    expect(() => {
      (Role as any).create('NewRole');
    }).toThrow();
  });

  it('should create Role Administrator with createAdministrator static method', () => {
    expect(() => {
      Role.createAdministrator();
    }).not.toThrow();
  });

  it('should create Role Pokemon Trainer with createPokemonTrainer static method', () => {
    expect(() => {
      Role.createPokemonTrainer();
    }).not.toThrow();
  });

  it('createAdministrator should create with value Administrator', () => {
    expect((Role.createAdministrator() as any).value).toBe('Administrator');
  });

  it('createPokemonTrainer should create with value PokemonTrainer', () => {
    expect((Role.createPokemonTrainer() as any).value).toBe('PokemonTrainer');
  });

  it('should not change a value of Role object', () => {
    const role = Role.createAdministrator();
    expect(() => {
      (role as any).value = 'PokemonTrainer';
    }).toThrow();
  });

  it('should not be equal to null', () => {
    const role = Role.createAdministrator();
    expect(role.equals(null)).toBeFalsy();
  });

  it('should not be equal to undefined', () => {
    const role = Role.createAdministrator();
    expect(role.equals(undefined)).toBeFalsy();
  });

  it('should not be equal to a simple object with same value', () => {
    const role = Role.createAdministrator();
    const roleSimpleObj = { value: 'Administrator' };
    expect(role.value).toBe('Administrator');
    expect(roleSimpleObj.value).toBe('Administrator');
    expect(role.equals(roleSimpleObj as any)).toBeFalsy();
  });

  it('should not be equal to a different Role', () => {
    const role = Role.createAdministrator();
    expect(role.equals(Role.createPokemonTrainer())).toBeFalsy();
  });

  it('should be equal to same Role', () => {
    expect(
      Role.createAdministrator().equals(Role.createAdministrator()),
    ).toBeTruthy();
  });
});
