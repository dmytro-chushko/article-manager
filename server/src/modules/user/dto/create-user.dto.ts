import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

import { ValidationMessage } from 'src/utils/consts';

export class CreateUserDto {
  @ApiProperty({
    example: 'ElonMask@gmail.com',
    description: 'User registration email',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  @IsEmail({}, { message: ValidationMessage.IS_EMAIL })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User registration password' })
  @IsString({ message: ValidationMessage.IS_STRING })
  @Length(4, 16, { message: ValidationMessage.PASSWORD_LENGTH })
  readonly password: string;
}
