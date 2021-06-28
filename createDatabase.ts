import { Connection } from "typeorm";
import { NumberInteger, Pokemon, PokemonName, PokemonType } from "./src/domain/pokemon";
import { Email, Nickname, Password, Role, User } from "./src/domain/user";
import getConnection from './src/infra/repositories/shared/getConnection';
import TypeormPokemonRepository from "./src/infra/repositories/TypeormPokemonRepository/TypeormPokemonRepository";
import TypeormUserRepository from './src/infra/repositories/TypeormUserRepository/TypeormUserRepository';

const createDatabase = async () => {
    let connection: Connection;
    try {
        connection = await getConnection();
    } catch (error) {
        console.log('Fail to connect to database to generate database entities');
        console.error(error)
        process.exit(1);
    }
    try {
        await connection.synchronize();
        const userRepo = new TypeormUserRepository();
        const pokemonRepo = new TypeormPokemonRepository();
        const adminEmailUser = Email.create('admin@domain.com');
        const currentUserAdmin = await userRepo.findByEmail(adminEmailUser)
        if(!currentUserAdmin){
            await userRepo.save(User.create({
                email: adminEmailUser,
                nickname: Nickname.create('Admin'),
                password: Password.create('a1B&abcd'),
                role: Role.createAdministrator(),
            }));
            const pokemonTempToCreateCollection = Pokemon.create({
                pokemonId: NumberInteger.create(1),
                name: PokemonName.create("Pikachu"),
                type: PokemonType.create('Electric'),
            });
            await pokemonRepo.save(pokemonTempToCreateCollection);
            await pokemonRepo.remove(pokemonTempToCreateCollection);
        } else {
            console.log('Database entities was generated before');
            process.exit(0);
        }
    } catch (error) {
        console.log('Fail to generate database entities');
        console.error(error)
        process.exit(1);
    }
    console.log('Successfully generated Database entities');
    process.exit(0);
}
createDatabase();