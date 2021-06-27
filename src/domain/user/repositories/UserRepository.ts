import { User } from "../entities";
import { Email, IdentityUuid } from "../valueObjects";

export interface UserRepository {
    findByUserId(userId: IdentityUuid): User | undefined;
    findByEmail(email: Email): User | undefined;
    save(user: User);
}