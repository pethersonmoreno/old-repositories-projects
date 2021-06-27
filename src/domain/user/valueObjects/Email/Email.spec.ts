import Email from './Email';

describe('Email', () => {
    it('should not create Email directly', () => {
        expect(() => {
            new (Email as any)()
        }).toThrow();
        expect(() => {
            new (Email as any)('someone@domain.com')
        }).toThrow();
    });

    it('should not throw create Email with create static method', () => {
        expect(() => {
            Email.create("someother@email.com")
        }).not.toThrow();
    });

    it('create method should create with same value used in parameter', () => {
        expect((Email.create("someother@email.com")).value).toBe('someother@email.com');
    });

    it('should not change a value of Email object', () => {
        const email = Email.create("someone@email.com");
        expect(()=>{
            (email as any).value = 'someother@email.com'
        }).toThrow();
    });

    it('should not be equal to null', () => {
        const email = Email.create("someone@email.com");
        expect(email.equals(null)).toBeFalsy();
    });

    it('should not be equal to undefined', () => {
        const email = Email.create("someone@email.com");
        expect(email.equals(undefined)).toBeFalsy();
    });

    it('should not be equal to a simple object with same value', () => {
        const email = Email.create('someone@domain.com');
        const emailSimpleObj = { value: 'someone@domain.com' };
        expect(email.value).toBe('someone@domain.com');
        expect(emailSimpleObj.value).toBe('someone@domain.com');
        expect(email.equals(emailSimpleObj as any)).toBeFalsy();
    });

    it('should not be equal to a different Email', () => {
        const email1 = Email.create('someone@domain.com');
        const email2 = Email.create('someother@domain.com');
        expect(email1.equals(email2)).toBeFalsy();
    });

    it('should not be equal to same Email', () => {
        const email1 = Email.create('someone@domain.com');
        const email2 = Email.create('someone@domain.com');
        expect(email1.equals(email2)).toBeTruthy();
    });
});
