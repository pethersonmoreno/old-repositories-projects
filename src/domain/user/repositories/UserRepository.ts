import { User } from "../entities";
import { IdentityUuid } from "../valueObjects";

export interface UserRepository {
    findByUserId(userId: IdentityUuid): User | undefined;
    save(user: User);
}