import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthRoute } from 'src/utils/consts/route';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth-jwt.guard';

@Controller(AuthRoute.DEFAULT)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'Registrate new user',
  })
  @Post(AuthRoute.REGISTR)
  registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.registration(dto, response);
  }

  @ApiOperation({ summary: 'User authentication' })
  @ApiResponse({
    status: 201,
    description: 'Sign in new user',
  })
  @Post(AuthRoute.LOGIN)
  login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(dto, response);
  }

  @ApiOperation({ summary: 'User log out' })
  @ApiResponse({
    status: 200,
    description: 'User log out',
  })
  @UseGuards(JwtAuthGuard)
  @Post(AuthRoute.LOGOUT)
  logOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.logOut(response);
  }
}
