import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  NumberInteger,
  Pokemon,
  PokemonDTO,
  PokemonRepository,
  PokemonService,
} from '../../../domain/pokemon';
import { NotFoundError, ValidationError } from '../../../shared/errors';

@Controller('pokemon')
export class PokemonController {
  private readonly pokemonRepository: PokemonRepository;
  private readonly pokemonService: PokemonService;
  constructor(
    @Inject('PokemonRepository') pokemonRepository: PokemonRepository,
  ) {
    this.pokemonRepository = pokemonRepository;
    this.pokemonService = new PokemonService(pokemonRepository);
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const allPokemons = await this.pokemonRepository.getAll();
      res.send(allPokemons.map((item) => this.fromEntityToDto(item)));
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @Post()
  async registerPokemon(@Body() pokemonDto: PokemonDTO, @Res() res: Response) {
    try {
      await this.pokemonService.register(pokemonDto);
      res.status(HttpStatus.CREATED).send();
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @Get(':id')
  async detailPokemon(@Param() params: { id: string }, @Res() res: Response) {
    const pokemonId = parseInt(params.id, 10);
    if (isNaN(pokemonId)) {
      this.sendErrorResponse(new ValidationError('Invalid Pokemon ID'), res);
      return;
    }
    try {
      const pokemon = await this.pokemonRepository.findByPokemonId(
        NumberInteger.create(pokemonId),
      );
      if (!pokemon) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: 'Pokemon not found',
        });
        return;
      }
      res.send(this.fromEntityToDto(pokemon));
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @Put(':id')
  async updatePokemon(
    @Body() pokemonDtoWithoutId: Omit<PokemonDTO, 'pokemonId'>,
    @Param() params: { id: string },
    @Res() res: Response,
  ) {
    const pokemonId = parseInt(params.id, 10);
    if (isNaN(pokemonId)) {
      this.sendErrorResponse(new ValidationError('Invalid Pokemon ID'), res);
      return;
    }
    try {
      await this.pokemonService.update({
        ...pokemonDtoWithoutId,
        pokemonId: pokemonId,
      });
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @Delete(':id')
  async removePokemon(@Param() params: { id: string }, @Res() res: Response) {
    const pokemonId = parseInt(params.id, 10);
    if (isNaN(pokemonId)) {
      this.sendErrorResponse(new ValidationError('Invalid Pokemon ID'), res);
      return;
    }
    try {
      await this.pokemonService.remove(pokemonId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  private fromEntityToDto(item: Pokemon): PokemonDTO {
    return {
      pokemonId: item.pokemonId.value,
      name: item.name.value,
      type: item.type.value,
    };
  }

  private sendErrorResponse(error: Error, res: Response) {
    if (error instanceof ValidationError) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: error.message,
      });
      return;
    }
    if (error instanceof NotFoundError) {
      res.status(HttpStatus.NOT_FOUND).send({
        error: error.message,
      });
      return;
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: error.message,
    });
  }
}
