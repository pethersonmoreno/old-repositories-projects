import { User } from '../../entities';
import { UserRepository } from '../../repositories/UserRepository';
import { Email, IdentityUuid, Nickname, Password, Role } from '../../valueObjects';
import UserService from './UserService';


class MemoryUserRepository implements UserRepository {
    private allUsers: User[];
    constructor(){
        this.allUsers = [];
    }
    findByUserId(userId: IdentityUuid): User {
        return this.allUsers.find(user => user.userId.equals(userId));
    }
    findByEmail(email: Email): User {
        return this.allUsers.find(user => user.email.equals(email));
    }
    save(user: User) {
        const currentUser = this.findByUserId(user.userId);
        if(currentUser){
            this.allUsers = this.allUsers.map(itemUser => {
                if(itemUser.equals(user)){
                    return user;
                }
                return itemUser;
            });
        } else {
            this.allUsers = [...this.allUsers, user];
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
        userRepository.save(user1);
        const userService = new UserService(userRepository);

        it('should be valid if email with password exists', () => {
            expect(userService.validateLogin(user1Email, user1Password)).toBeTruthy();
        });

        it('should be invalid if email exists but it is not a valid password', () => {
            expect(userService.validateLogin(user1Email, "b9&Kf4j33fjlsyg8")).toBeFalsy();
        });

        it('should be invalid if password exists but it is not compatible with the user', () => {
            expect(userService.validateLogin(user1Email, user2Password)).toBeFalsy();
        });
    });
});
