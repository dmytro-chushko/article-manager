import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { ArticleParserModule } from './modules/article-parser/article-parser.module';
import { ArticleModule } from './modules/article/article.module';
import { Article } from './modules/article/entities/article.entity';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'article-images'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_NAME,
      entities: [Article, User],
      synchronize: true,
    }),
    ArticleParserModule,
    ArticleModule,
    FilesModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
