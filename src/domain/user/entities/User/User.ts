import { v4 as uuidv4 } from 'uuid';
import {
  Email,
  IdentityUuid,
  Nickname,
  Password,
  Role,
} from '../../valueObjects';
import { ValidationError } from '../../../../shared/errors';

const securityValue = uuidv4();

type ValidUser = {
  userId: IdentityUuid;
  email: Email;
  nickname: Nickname;
  password: Password;
  role: Role;
};

export default class User {
  private constructor(value: ValidUser, secValue: any) {
    if (secValue !== securityValue) {
      throw new ValidationError('Invalid Instantiation');
    }
    const { userId, email, nickname, password, role } = value;
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

  public updateEmail(newEmail: string) {
    (this as any)[securityValue].email = Email.create(newEmail);
  }

  public updateNickname(newNickname: string) {
    (this as any)[securityValue].nickname = Nickname.create(newNickname);
  }

  public updatePassword(newRawPassword: string) {
    (this as any)[securityValue].password = Password.create(newRawPassword);
  }

  public equals(value: User): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!(value instanceof User)) {
      return false;
    }
    return this.userId.equals(value.userId);
  }

  public static create(value: Omit<ValidUser, 'userId'>) {
    return this.createWithUserId({
      userId: IdentityUuid.create(),
      email: value.email,
      nickname: value.nickname,
      password: value.password,
      role: value.role,
    });
  }

  public static createWithUserId(value: ValidUser) {
    if (!(value.userId instanceof IdentityUuid)) {
      throw new ValidationError('Invalid userid');
    }
    if (!(value.email instanceof Email)) {
      throw new ValidationError('Invalid email');
    }
    if (!(value.nickname instanceof Nickname)) {
      throw new ValidationError('Invalid nickname');
    }
    if (!(value.password instanceof Password)) {
      throw new ValidationError('Invalid password');
    }
    if (!(value.role instanceof Role)) {
      throw new ValidationError('Invalid role');
    }
    return new User(value, securityValue);
  }
}
