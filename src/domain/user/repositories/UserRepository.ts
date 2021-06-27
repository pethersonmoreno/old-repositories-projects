import { User } from '../entities';
import { Email, IdentityUuid } from '../valueObjects';

export interface UserRepository {
  findByUserId(userId: IdentityUuid): Promise<User | undefined>;
  findByEmail(email: Email): Promise<User | undefined>;
  save(user: User): Promise<void>;
}
