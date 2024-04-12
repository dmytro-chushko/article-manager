import { Module } from '@nestjs/common';

import { ArticleModule } from '../article/article.module';
import { ArticleParserGateway } from './article-parser.gateway';
import { ArticleParserService } from './article-parser.service';

@Module({
  imports: [ArticleModule],
  providers: [ArticleParserService, ArticleParserGateway],
})
export class ArticleParserModule {}
