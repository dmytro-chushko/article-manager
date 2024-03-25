import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRoute } from 'src/utils/consts/route';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller(UserRoute.DEFAULT)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Receiving all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Remove user by id' })
  @ApiResponse({ status: 201, type: User })
  @Delete(UserRoute.PARAM_ID)
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
