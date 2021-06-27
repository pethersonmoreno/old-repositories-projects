import { User } from '../../entities';
import { UserRepository } from '../../repositories';
import { Email, IdentityUuid, Nickname, Password, Role } from '../../valueObjects';
import UserService from './UserService';


class MemoryUserRepository implements UserRepository {
    private allUsers: User[];
    constructor(){
        this.allUsers = [];
    }
    findByUserId(userId: IdentityUuid): Promise<User> {
        return Promise.resolve(this.cloneUserIfDefined(this.allUsers.find(user => user.userId.equals(userId))));
    }
    findByEmail(email: Email): Promise<User> {
        return Promise.resolve(this.cloneUserIfDefined(this.allUsers.find(user => user.email.equals(email))));
    }
    private cloneUserIfDefined(user?: User) {
        if(!user){
            return undefined;
        }
        return User.createWithUserId({
            userId: user.userId,
            email: user.email,
            nickname: user.nickname,
            password: user.password,
            role: user.role,
        })
    }
    async save(user: User): Promise<void> {
        const currentUser = await this.findByUserId(user.userId);
        if(currentUser){
            this.allUsers = this.allUsers.map(itemUser => {
                if(itemUser.equals(user)){
                    return this.cloneUserIfDefined(user);
                }
                return itemUser;
            });
        } else {
            this.allUsers = [...this.allUsers, this.cloneUserIfDefined(user)];
        }
    }

}

describe('UserService', () => {
    describe('validateLogin', () => {
        const user1Email = 'someone@domain.com';
        const user1Password = "x9&Kf4j33fjlsyg8";
        const user1 = User.create({
            email: Email.create(user1Email),
            nickname: Nickname.create('Someone'),
            password: Password.create(user1Password),
            role: Role.createAdministrator(),
        });
        const user2Email = 'someone2@domain.com';
        const user2Password = "c9&Kf4j33fjlsyg8";
        const user2 = User.create({
            email: Email.create(user2Email),
            nickname: Nickname.create('Someone2'),
            password: Password.create(user2Password),
            role: Role.createAdministrator(),
        });
        const userRepository = new MemoryUserRepository();
        let userService: UserService;

        beforeAll(async ()=>{
            await userRepository.save(user1);
            await userRepository.save(user2);
            userService = new UserService(userRepository);
        });

        it('should be valid if email with password exists', async () => {
            await expect(userService.validateLogin(user1Email, user1Password)).resolves.toBeTruthy();
        });

        it('should be invalid if email exists but it is not a valid password', async () => {
            await expect(userService.validateLogin(user1Email, "b9&Kf4j33fjlsyg8")).resolves.toBeFalsy();
        });

        it('should be invalid if password exists but it is not compatible with the user', async () => {
            await expect(userService.validateLogin(user1Email, user2Password)).resolves.toBeFalsy();
        });

        it('should throw to invalid email', async () => {
            await expect(userService.validateLogin('invalidemail', user1Password)).rejects.toThrow();
        });
    });
});
