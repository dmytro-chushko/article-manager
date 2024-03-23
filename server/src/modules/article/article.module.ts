import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './entities/article.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), FilesModule],
  exports: [ArticleService],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}