
import { Email, IdentityUuid, Nickname, Password, Role, User as UserEntity, UserRepository } from "../../../domain/user";
import { getRepository, Repository } from "typeorm"; 
import UserTypeorm from '../entities/User';

export default class TypeormUserRepository implements UserRepository {
    private userRepositoryTypeorm: Repository<UserTypeorm>;
    constructor(){
        this.userRepositoryTypeorm = getRepository(UserTypeorm); 
    }
    async findByUserId(userId: IdentityUuid): Promise<UserEntity> {
        const userById = await this.userRepositoryTypeorm.findOne({ where: { userId: userId.value }})
        if (!userById){
            return undefined;
        }
        return this.convertToEntity(userById);
    }
    async findByEmail(email: Email): Promise<UserEntity> {
        const userByEmail = await this.userRepositoryTypeorm.findOne({ where: { email: email.value }})
        if (!userByEmail){
            return undefined;
        }
        return this.convertToEntity(userByEmail);
    }
    async save(user: UserEntity): Promise<void> {
        const userById = await this.userRepositoryTypeorm.findOne({ where: { userId: user.userId.value }})
        if (!userById){
            await this.insert(user);
            return;
        }
        await this.update(user);
    }

    private async insert(user: UserEntity){
        await this.userRepositoryTypeorm.insert(this.convertFromEntity(user));
    }

    private async update(user: UserEntity){
        await this.userRepositoryTypeorm.save(this.convertFromEntity(user));
    }
    
    private convertToEntity(user: UserTypeorm):UserEntity{
        return UserEntity.createWithUserId({
            userId: IdentityUuid.createFromUuid(user.userId.toString()),
            email: Email.create(user.email),
            nickname: Nickname.create(user.nickname),
            password: Password.createFromHash(user.password),
            role: Role.create(user.role as any),
        });
    }

    private convertFromEntity(user: UserEntity){
        return {
            _id: user.userId.value,
            userId: user.userId.value,
            email: user.email.value,
            nickname: user.nickname.value,
            password: user.password.hash,
            role: user.role.value,
        };
    }
}