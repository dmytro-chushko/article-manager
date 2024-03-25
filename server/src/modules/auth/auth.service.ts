import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

import { JwtService } from '@nestjs/jwt';
import { IUserResponse } from 'src/types';
import { ExceptionMessage } from 'src/utils/consts';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

const SALT = 7;
const COOKIE_KEY = 'access-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registration(
    dto: CreateUserDto,
    response: Response,
  ): Promise<IUserResponse> {
    const candidate = await this.userService.findOneByEmail(dto.email);
    if (candidate) {
      throw new ConflictException(ExceptionMessage.ALREADY_EXIST);
    }

    const hashPassword = await bcrypt.hash(dto.password, SALT);
    const newUser = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    response.cookie(COOKIE_KEY, this.generateToken(newUser), {
      httpOnly: true,
    });

    return { id: newUser.id, email: newUser.email };
  }

  async login(dto: CreateUserDto, response: Response): Promise<IUserResponse> {
    const user = await this.validateUser(dto);

    response.cookie(COOKIE_KEY, this.generateToken(user), {
      httpOnly: true,
    });

    return { id: user.id, email: user.email };
  }

  private async validateUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTH);
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTH);
    }

    return user;
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
