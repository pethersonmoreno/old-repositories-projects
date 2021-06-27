import NumberInteger from './NumberInteger';

describe('NumberInteger', () => {
  it('should not create NumberInteger directly', () => {
    expect(() => {
      new (NumberInteger as any)();
    }).toThrow();
    expect(() => {
      new (NumberInteger as any)(4);
    }).toThrow();
  });

  it('should not throw create NumberInteger with create static method', () => {
    expect(() => {
      NumberInteger.create(5);
    }).not.toThrow();
  });

  it('create method should create with same value used in parameter', () => {
    expect(NumberInteger.create(6).value).toBe(6);
  });

  it('should not change a value of NumberInteger object', () => {
    const numberInteger = NumberInteger.create(2);
    expect(() => {
      (numberInteger as any).value = 3;
    }).toThrow();
  });

  it('should not be equal to null', () => {
    const numberInteger = NumberInteger.create(3);
    expect(numberInteger.equals(null)).toBeFalsy();
  });

  it('should not be equal to undefined', () => {
    const numberInteger = NumberInteger.create(3);
    expect(numberInteger.equals(undefined)).toBeFalsy();
  });

  it('should not be equal to a simple object with same value', () => {
    const numberInteger = NumberInteger.create(3);
    const numberIntegerSimpleObj = { value: 3 };
    expect(numberInteger.value).toBe(3);
    expect(numberIntegerSimpleObj.value).toBe(3);
    expect(numberInteger.equals(numberIntegerSimpleObj as any)).toBeFalsy();
  });

  it('should not be equal to a different NumberInteger', () => {
    const numberInteger1 = NumberInteger.create(2);
    const numberInteger2 = NumberInteger.create(3);
    expect(numberInteger1.equals(numberInteger2)).toBeFalsy();
  });

  it('should be equal to same NumberInteger', () => {
    const numberInteger1 = NumberInteger.create(3);
    const numberInteger2 = NumberInteger.create(3);
    expect(numberInteger1.equals(numberInteger2)).toBeTruthy();
  });

  it('should throw if is used an invalid NumberInteger', () => {
    const invalidnumberIntegerNames = [
      -1,
      0,
      1.1,
      3.3,
      4.9,
      777.10,
      5/10,
    ];
    invalidnumberIntegerNames.forEach((invalidnumberIntegerName) => {
      expect(() => {
        NumberInteger.create(invalidnumberIntegerName);
      }).toThrow();
    });
  });
});
