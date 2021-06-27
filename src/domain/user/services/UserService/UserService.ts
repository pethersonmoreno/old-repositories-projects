import { UserRepository } from "../../repositories";
import { Email } from "../../valueObjects";

export default class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async validateLogin(email: string, password: string): Promise<boolean> {
        const emailObj = Email.create(email);
        const userByEmail = await this.userRepository.findByEmail(emailObj);
        return userByEmail.password.matchRawPassword(password);
    }
}