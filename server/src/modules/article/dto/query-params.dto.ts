import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ValidationMessage } from 'src/utils/consts';

export enum SortValue {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryParamsDto {
  @ApiProperty({
    description: 'Search query key',
    example: 'Some search word',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  readonly search?: string;

  @ApiProperty({
    description: 'Status of the card',
    example: 'to-do',
    enum: SortValue,
  })
  @IsEnum(SortValue, {
    message: `${ValidationMessage.IS_ENUM} ASC or DESC`,
  })
  readonly sort?: SortValue;

  @ApiProperty({
    example: '1',
    description: 'Page number',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  readonly page?: number;

  @ApiProperty({
    example: '10',
    description: 'Number of articles per page',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  readonly limit?: number;
}
