import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleRoute } from 'src/utils/consts/route';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller(ArticleRoute.DEFAULT)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: 'Create new article' })
  @ApiResponse({ status: 201, type: Article })
  @Post()
  @UseInterceptors(FileInterceptor('image-file'))
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 150000 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.articleService.createByAdmin(createArticleDto, image);
  }

  @ApiOperation({ summary: 'Get all existing articles' })
  @ApiResponse({ status: 200, type: [Article] })
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @ApiOperation({ summary: 'Get article by id' })
  @ApiResponse({ status: 200, type: Article })
  @Get(ArticleRoute.PARAM_ID)
  findOne(@Param('id') id: string) {
    return this.articleService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update article' })
  @ApiResponse({ status: 200, type: Article })
  @Patch(ArticleRoute.PARAM_ID)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @ApiOperation({ summary: 'Remove article' })
  @ApiResponse({ status: 200, type: Article })
  @Delete(ArticleRoute.PARAM_ID)
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
