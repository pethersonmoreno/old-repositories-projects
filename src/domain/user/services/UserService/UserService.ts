import { UserRepository } from "../../repositories";
import { Email, Nickname, Password, Role } from "../../valueObjects";
import { User } from "../../entities";

export type NewUserDTO = {
    email: string;
    nickname: string;
    password: string;
};

export default class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

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
        if(userByEmail){
            throw new Error(`Already exists another user with email ${email.value}`);
        }
        const newUser = User.create({
            email,
            nickname,
            password,
            role
        });
        await this.userRepository.save(newUser);
    }
}