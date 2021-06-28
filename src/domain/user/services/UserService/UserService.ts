import { UserRepository } from '../../repositories';
import {
  Email,
  IdentityUuid,
  Nickname,
  Password,
  Role,
} from '../../valueObjects';
import { User } from '../../entities';
import { ValidationError, NotFoundError } from '../../../../shared/errors';

export type UpdateUserDTO = {
  userId: string;
  email: string;
  nickname: string;
  password: string;
};
export type NewUserDTO = Omit<UpdateUserDTO, 'userId'>;

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateLogin(email: string, password: string): Promise<boolean> {
    const emailObj = Email.create(email);
    const userByEmail = await this.userRepository.findByEmail(emailObj);
    return userByEmail.password.matchRawPassword(password);
  }

  async register(newUserDto: NewUserDTO): Promise<void> {
    const email = Email.create(newUserDto.email);
    const nickname = Nickname.create(newUserDto.nickname);
    const password = Password.create(newUserDto.password);
    const role = Role.createPokemonTrainer();
    const userByEmail = await this.userRepository.findByEmail(email);
    if (userByEmail) {
      throw new ValidationError(`Already exists another user with email ${email.value}`);
    }
    const newUser = User.create({
      email,
      nickname,
      password,
      role,
    });
    await this.userRepository.save(newUser);
  }

  async update(updateUserDto: UpdateUserDTO): Promise<void> {
    const userId = IdentityUuid.createFromUuid(updateUserDto.userId);
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new NotFoundError(`User not found with ID ${updateUserDto.userId}`);
    }
    const newEmail = Email.create(updateUserDto.email);
    if (await this.existOtherUserByEmail(user, newEmail)) {
      throw new ValidationError(
        `Already exists another user with email ${newEmail.value}`,
      );
    }
    user.updateEmail(newEmail.value);
    user.updateNickname(updateUserDto.nickname);
    user.updatePassword(updateUserDto.password);
    await this.userRepository.save(user);
  }

  private async existOtherUserByEmail(
    user: User,
    newEmail: Email,
  ): Promise<boolean> {
    if (newEmail.equals(user.email)) {
      return false;
    }
    const otherByEmail = await this.userRepository.findByEmail(newEmail);
    return !!otherByEmail;
  }
}
