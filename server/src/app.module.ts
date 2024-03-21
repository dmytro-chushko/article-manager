import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleParserModule } from './modules/article-parser/article-parser.module';
import { ArticleModule } from './modules/article/article.module';
import { Article } from './modules/article/entities/article.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_NAME,
      entities: [Article],
      synchronize: true,
    }),
    ArticleParserModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
