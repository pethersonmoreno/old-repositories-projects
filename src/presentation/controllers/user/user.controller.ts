import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {
  NewUserDTO,
  UpdateUserDTO,
  UserRepository,
  UserService,
} from '../../../domain/user';
import { NotFoundError, ValidationError } from '../../../shared/errors';

@Controller()
export class UserController {
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  constructor(@Inject('UserRepository') userRepository: UserRepository, jwtService: JwtService) {
    this.userService = new UserService(userRepository);
    this.jwtService = jwtService;
  }

  @Post('login')
  async loginUser(
    @Body() credentials: { username: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const userValid = await this.userService.validateLogin(
        credentials.username,
        credentials.password,
      );
      if(!userValid){
        res.status(HttpStatus.UNAUTHORIZED).send({
            error: "Invalid username or password",
        });
        return;
      }
      const payload = { username: userValid.email.value, sub: userValid.userId.value, role: userValid.role.value };
      res.send({
        access_token: this.jwtService.sign(payload),
      });
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @Post('user')
  async registerUser(@Body() newUserDto: NewUserDTO, @Res() res: Response) {
    try {
      await this.userService.register(newUserDto);
      res.status(HttpStatus.CREATED).send();
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @Put('user/:id')
  async updateUser(
    @Body() updateUserDtoWithoutId: Omit<UpdateUserDTO, 'userId'>,
    @Param() params: { id: string },
    @Res() res: Response,
  ) {
    try {
      await this.userService.update({
        ...updateUserDtoWithoutId,
        userId: params.id,
      });
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
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
