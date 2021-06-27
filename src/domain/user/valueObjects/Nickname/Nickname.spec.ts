import Nickname from './Nickname';

describe('Nickname', () => {
    it('should not create Nickname directly', () => {
        expect(() => {
            new (Nickname as any)()
        }).toThrow();
        expect(() => {
            new (Nickname as any)('Nickname')
        }).toThrow();
    });

    it('should not throw create Nickname with create static method', () => {
        expect(() => {
            Nickname.create("Nickname")
        }).not.toThrow();
    });

    it('create method should create with same value used in parameter', () => {
        expect((Nickname.create("Nickname")).value).toBe('Nickname');
    });

    it('should not change a value of Nickname object', () => {
        const nickname = Nickname.create("Nickname");
        expect(() => {
            (nickname as any).value = 'Othernickname'
        }).toThrow();
    });

    it('should not be equal to null', () => {
        const nickname = Nickname.create("Nickname");
        expect(nickname.equals(null)).toBeFalsy();
    });

    it('should not be equal to undefined', () => {
        const nickname = Nickname.create("Nickname");
        expect(nickname.equals(undefined)).toBeFalsy();
    });

    it('should not be equal to a simple object with same value', () => {
        const nickname = Nickname.create('Nickname');
        const nicknameSimpleObj = { value: 'Nickname' };
        expect(nickname.value).toBe('Nickname');
        expect(nicknameSimpleObj.value).toBe('Nickname');
        expect(nickname.equals(nicknameSimpleObj as any)).toBeFalsy();
    });

    it('should not be equal to a different Nickname', () => {
        const nickname1 = Nickname.create('Nickname');
        const nickname2 = Nickname.create('Othernickname');
        expect(nickname1.equals(nickname2)).toBeFalsy();
    });

    it('should be equal to same Nickname', () => {
        const nickname1 = Nickname.create('Nickname');
        const nickname2 = Nickname.create('Nickname');
        expect(nickname1.equals(nickname2)).toBeTruthy();
    });

    it('should throw if is used an invalid nickname address', () => {
        const invalidNicknames = [
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
        ]
        invalidNicknames.forEach(invalidNickname => {
            expect(() => {
                Nickname.create(invalidNickname)
            }).toThrow();
        })
    });
});
