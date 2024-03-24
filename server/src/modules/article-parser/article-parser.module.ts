import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ArticleModule } from '../article/article.module';
import { ArticleParserService } from './article-parser.service';
import { ArticleParserGateway } from './article-parser.gateway';

@Module({
  imports: [ScheduleModule.forRoot(), ArticleModule],
  providers: [ArticleParserService, ArticleParserGateway],
})
export class ArticleParserModule {}
