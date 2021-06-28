import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import TypeormPokemonRepository from '../../infra/repositories/TypeormPokemonRepository/TypeormPokemonRepository';
import TypeormUserRepository from '../../infra/repositories/TypeormUserRepository/TypeormUserRepository';
import { PokemonController } from './pokemon/pokemon.controller';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user/user.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [UserController, PokemonController],
  providers: [
    JwtStrategy,
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
