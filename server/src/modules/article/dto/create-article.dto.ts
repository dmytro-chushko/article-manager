import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MaxLength } from 'class-validator';

import { ValidationMessage } from 'src/utils/consts';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Article ID from newsdata.io ',
    example: '9c321aa21d243e3eb912f40e355c0940',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  readonly article_id?: string;

  @ApiProperty({
    example:
      '1 of 6 former officers in Mississippi gets 40 years for racist torture of 2 Black men',
    description: 'Article title',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  @MaxLength(100, { message: `${ValidationMessage.MAX_LENGTH} 100` })
  readonly title: string;

  @ApiProperty({
    description: 'Article link',
    example:
      'https://www.castanet.net/news/World/478029/1-of-6-former-officers-in-Mississippi-gets-40-years-for-racist-torture-of-2-Black-men',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  readonly link?: string;

  @ApiProperty({
    description: 'Article description',
    example: 'Article tells about something',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  @MaxLength(500, { message: `${ValidationMessage.MAX_LENGTH} 500` })
  readonly description: string;

  @ApiProperty({
    description: 'Article image',
    example:
      'https://www.castanet.net/content/2024/3/20240320140336-65fb2ca189b4f1ec23c51e10jpeg_p3773529.jpg',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  readonly image_url?: string;

  @ApiProperty({
    description: 'Article creators',
    example: '["Jhone Snow", "Alex Murphy" ]',
  })
  @IsArray({ message: ValidationMessage.IS_ARRAY })
  readonly creator: string[];
}
