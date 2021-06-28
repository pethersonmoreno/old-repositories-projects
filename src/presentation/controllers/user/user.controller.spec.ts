import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository, User, IdentityUuid, Email } from '../../../domain/user';
import { UserController } from './user.controller';

class MemoryUserRepository implements UserRepository {
  private allUsers: User[];
  constructor() {
    this.allUsers = [];
  }
  findByUserId(userId: IdentityUuid): Promise<User> {
    return Promise.resolve(
      this.cloneUserIfDefined(
        this.allUsers.find((user) => user.userId.equals(userId)),
      ),
    );
  }
  findByEmail(email: Email): Promise<User> {
    return Promise.resolve(
      this.cloneUserIfDefined(
        this.allUsers.find((user) => user.email.equals(email)),
      ),
    );
  }
  private cloneUserIfDefined(user?: User) {
    if (!user) {
      return undefined;
    }
    return User.createWithUserId({
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      password: user.password,
      role: user.role,
    });
  }
  async save(user: User): Promise<void> {
    const currentUser = await this.findByUserId(user.userId);
    if (currentUser) {
      this.allUsers = this.allUsers.map((itemUser) => {
        if (itemUser.equals(user)) {
          return this.cloneUserIfDefined(user);
        }
        return itemUser;
      });
    } else {
      this.allUsers = [...this.allUsers, this.cloneUserIfDefined(user)];
    }
  }
}


describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
            provide: 'UserRepository',
            useClass: MemoryUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
