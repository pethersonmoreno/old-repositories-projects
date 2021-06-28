import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import {
  NewUserDTO,
  Role,
  UpdateUserDTO,
  UserRepository,
  UserService,
} from '../../../domain/user';
import { NotFoundError, ValidationError } from '../../../shared/errors';

type TokenPayload = {
  username: string;
  sub: string;
  role: string;
}

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
      const payload: TokenPayload = { username: userValid.email.value, sub: userValid.userId.value, role: userValid.role.value };
      res.send({
        access_token: this.jwtService.sign(payload),
      });
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  async registerUser(@Body() newUserDto: NewUserDTO, @Res() res: Response, @Req() req: Request) {
    const tokenData: TokenPayload = this.jwtService.decode(req.headers.authorization.replace('Bearer ', '')) as any;
    if(tokenData.role !== Role.createAdministrator().value){
        res.status(HttpStatus.UNAUTHORIZED).send();
        return;
    }
    try {
      await this.userService.register(newUserDto);
      res.status(HttpStatus.CREATED).send();
    } catch (error) {
      this.sendErrorResponse(error, res);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/:id')
  async updateUser(
    @Body() updateUserDtoWithoutId: Omit<UpdateUserDTO, 'userId'>,
    @Param() params: { id: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const tokenData: TokenPayload = this.jwtService.decode(req.headers.authorization.replace('Bearer ', '')) as any;
    if(tokenData.role !== Role.createAdministrator().value){
        res.status(HttpStatus.UNAUTHORIZED).send();
        return;
    }
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
