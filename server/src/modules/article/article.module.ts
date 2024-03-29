import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), FilesModule, AuthModule],
  exports: [ArticleService],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
