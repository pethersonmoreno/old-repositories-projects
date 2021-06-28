import { Module } from '@nestjs/common';
import TypeormPokemonRepository from '../../infra/repositories/TypeormPokemonRepository/TypeormPokemonRepository';
import TypeormUserRepository from '../../infra/repositories/TypeormUserRepository/TypeormUserRepository';
import { PokemonController } from './pokemon/pokemon.controller';
import { UserController } from './user/user.controller';

@Module({
  controllers: [UserController, PokemonController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeormUserRepository,
    },
    {
      provide: 'PokemonRepository',
      useClass: TypeormPokemonRepository,
    },
  ],
})
export class ControllersModule {}
