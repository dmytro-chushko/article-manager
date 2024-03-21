import { Module } from '@nestjs/common';
import { ArticleParserService } from './article-parser.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ArticleParserService],
})
export class ArticleParserModule {}
