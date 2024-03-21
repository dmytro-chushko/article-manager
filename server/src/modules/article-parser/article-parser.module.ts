import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ArticleModule } from '../article/article.module';
import { ArticleParserService } from './article-parser.service';

@Module({
  imports: [ScheduleModule.forRoot(), ArticleModule],
  providers: [ArticleParserService],
})
export class ArticleParserModule {}
