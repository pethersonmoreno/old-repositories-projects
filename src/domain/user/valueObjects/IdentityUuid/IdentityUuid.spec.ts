import { v4 as uuidv4 } from 'uuid';
import IdentityUuid from './IdentityUuid';

const testUuid = uuidv4()

describe('IdentityUuid', () => {
    it('should not create IdentityUuid directly', () => {
        expect(() => {
            new (IdentityUuid as any)()
        }).toThrow();
        expect(() => {
            new (IdentityUuid as any)(uuidv4())
        }).toThrow();
    });

    it('should not throw create IdentityUuid with create static method', () => {
        expect(() => {
            IdentityUuid.create()
        }).not.toThrow();
    });

    it('should not throw create IdentityUuid with createFromUuid static method', () => {
        expect(() => {
            IdentityUuid.createFromUuid(testUuid)
        }).not.toThrow();
    });

    it('createFromUuid method should create value with same value used in parameter', () => {
        expect((IdentityUuid.createFromUuid(testUuid)).value).toBe(testUuid);
    });

    it('should not change a value of IdentityUuid object', () => {
        const identityUuid = IdentityUuid.createFromUuid(testUuid);
        expect(() => {
            (identityUuid as any).value = uuidv4()
        }).toThrow();
    });

    it('should not be equal to null', () => {
        const identityUuid = IdentityUuid.createFromUuid(testUuid);
        expect(identityUuid.equals(null)).toBeFalsy();
    });

    it('should not be equal to undefined', () => {
        const identityUuid = IdentityUuid.createFromUuid(testUuid);
        expect(identityUuid.equals(undefined)).toBeFalsy();
    });

    it('should not be equal to a simple object with same value', () => {
        const identityUuid = IdentityUuid.createFromUuid(testUuid);
        const identityUuidSimpleObj = { value: identityUuid.value };
        expect(identityUuid.equals(identityUuidSimpleObj as any)).toBeFalsy();
    });

    it('should not be equal to a different IdentityUuid', () => {
        const identityUuid1 = IdentityUuid.createFromUuid(testUuid);
        const identityUuid2 = IdentityUuid.createFromUuid(uuidv4());
        expect(identityUuid1.equals(identityUuid2)).toBeFalsy();
    });

    it('should be equal to same uuid', () => {
        const identityUuid1 = IdentityUuid.create();
        const identityUuid2 = IdentityUuid.createFromUuid(identityUuid1.value);
        expect(identityUuid1.equals(identityUuid2)).toBeTruthy();
    });

    it('should throw if is used an invalid IdentityUuid', () => {
        const invalidUuids = [
            'S',
            'V',
            'Ca',
            'C@s',
            '1as',
            'C0s',
            'Upa',
            'UpaE',
            'UpaEn',
            'Upa2nb',
            'UpaE7b',
        ]
        invalidUuids.forEach(invalidUuids => {
            expect(() => {
                IdentityUuid.createFromUuid(invalidUuids)
            }).toThrow();
        })
    });
});
