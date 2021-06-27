import { v4 as uuidv4 } from 'uuid';
import { Email, IdentityUuid, Nickname, Password, Role } from '../valueObjects';

const securityValue = uuidv4();

type ValidUser = {
    userId: IdentityUuid;
    email: Email;
    nickname: Nickname;
    password: Password;
    role: Role;
};

export default class User {
    private constructor(value: ValidUser, secValue: any){
        if(secValue !== securityValue){
            throw new Error("Invalid Instantiation")
        }
        const {
            userId,
            email,
            nickname,
            password,
            role,
        } = value;
        (this as any)[securityValue] = {
            userId,
            email,
            nickname,
            password,
            role,
        };
    }

    public get userId(): IdentityUuid {
        return (this as any)[securityValue].userId;
    }

    public get email(): Email {
        return (this as any)[securityValue].email;
    }

    public get nickname(): Nickname {
        return (this as any)[securityValue].nickname;
    }

    public get password(): Password {
        return (this as any)[securityValue].password;
    }

    public get role(): Role {
        return (this as any)[securityValue].role;
    }

    public equals(value: User): boolean {
        if (value === null || value === undefined) {
             return false;
        }
        if (!(value instanceof User)){
            return false;
        }
        return this.userId === value.userId;
   }
    
    public static create(value: Omit<ValidUser, "userId">){
        return this.createWithUserId({
            userId: IdentityUuid.create(),
            email: value.email,
            nickname: value.nickname,
            password: value.password,
            role: value.role,
        });
    }

    public static createWithUserId(value: ValidUser) {
        return new User(value, securityValue);
    }
}