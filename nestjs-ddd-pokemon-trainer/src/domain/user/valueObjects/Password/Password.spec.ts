import Password from './Password';

const testPassword = 'x9&Kf4j33fjlsyg8';

describe('Password', () => {
  it('should not create Password directly', () => {
    expect(() => {
      new (Password as any)();
    }).toThrow();
    expect(() => {
      new (Password as any)(testPassword);
    }).toThrow();
  });

  it('should not throw create Password with create static method', () => {
    expect(() => {
      Password.create(testPassword);
    }).not.toThrow();
  });

  it('create method should not create hash with same value used in parameter', () => {
    expect(Password.create(testPassword).hash).not.toBe(testPassword);
  });

  it('should not change a hash of Password object', () => {
    const password = Password.create(testPassword);
    expect(() => {
      (password as any).hash = 'other-hash';
    }).toThrow();
  });

  it('should not be equal to null', () => {
    const password = Password.create(testPassword);
    expect(password.equals(null)).toBeFalsy();
  });

  it('should not be equal to undefined', () => {
    const password = Password.create(testPassword);
    expect(password.equals(undefined)).toBeFalsy();
  });

  it('should not be equal to a simple object with same value', () => {
    const password = Password.create(testPassword);
    const passwordSimpleObj = { hash: password.hash };
    expect(password.equals(passwordSimpleObj as any)).toBeFalsy();
  });

  it('should not be equal to a different Password', () => {
    const password1 = Password.create(testPassword);
    const password2 = Password.create('9&Kf4j3other');
    expect(password1.equals(password2)).toBeFalsy();
  });

  it('should be equal to same hash', () => {
    const password1 = Password.create(testPassword);
    const password2 = Password.createFromHash(password1.hash);
    expect(password1.equals(password2)).toBeTruthy();
  });

  it('should throw if is used an invalid Password', () => {
    const invalidPasswords = [
      'S',
      'V',
      'Ca',
      'C@s',
      '1as',
      'C0s',
      'Upa ',
      'Upa E',
      'Upa En',
      'Upa 2nb',
      'Upa E7b',
    ];
    invalidPasswords.forEach((invalidPassword) => {
      expect(() => {
        Password.create(invalidPassword);
      }).toThrow();
    });
  });

  it('should match the same raw password', () => {
    const password = Password.create(testPassword);
    expect(password.matchRawPassword(testPassword)).toBeTruthy();
  });

  it('should not match the different raw password', () => {
    const password = Password.create(testPassword);
    expect(password.matchRawPassword('9&Kf4j3other')).toBeFalsy();
  });
});
