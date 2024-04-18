import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { ValidationError, validate } from 'class-validator';

import { INewsDataArticle, IResponseNewsData } from 'src/types';
import { NewsDataLang, NewsDataRoute } from 'src/utils/consts';
import { ArticleEvent } from 'src/utils/consts/ArticleEvent';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { ArticleParserGateway } from './article-parser.gateway';
import { ParsedArticleDto } from './dto/parsed-article.dto';

@Injectable()
export class ArticleParserService {
  private readonly axiosClient: AxiosInstance;
  private readonly logger = new Logger(ArticleParserService.name);

  constructor(
    private readonly articleService: ArticleService,
    private readonly articleParserGateway: ArticleParserGateway,
    private readonly configService: ConfigService,
  ) {
    this.axiosClient = this.createAxiosClient();
    this.parseArticle();
  }

  @Cron('0 */1 * * * *')
  async parseArticle() {
    const articles = await this.fetchArticles<INewsDataArticle>();
    if (!Array.isArray(articles.results)) {
      this.logger.log('Retrived article list is not array');

      return;
    }

    this.logger.log(`Retrived articles - ${articles.results.length}`);

    const validatedArticles = await this.validateRetrivedArticles(
      articles.results,
    );

    this.logger.log(`Validated articles - ${validatedArticles.length}`);

    if (validatedArticles.length === 0) {
      this.logger.log('Validated article array is empty');

      return;
    }

    const parsedArticles = await Promise.all(
      validatedArticles.map(
        async article =>
          await this.articleService.createByParser({
            ...article,
            creator: article.creator ? article.creator : [],
          }),
      ),
    );

    if (parsedArticles.some(article => article)) {
      this.articleParserGateway.server.emit(ArticleEvent.ARTICLE_UPDATED);
    }

    this.logger.log(
      `Parsed articles - ${parsedArticles.filter(item => item).length}`,
    );
  }

  async fetchArticles<T>(): Promise<IResponseNewsData<T>> {
    const { data } = await this.axiosClient.get<IResponseNewsData<T>>(
      NewsDataRoute.NEWS,
      {
        params: {
          apikey: this.configService.get('NEWS_DATA_API_KEY'),
          language: NewsDataLang.EN,
        },
      },
    );

    return data;
  }

  private createAxiosClient(): AxiosInstance {
    const axiosClient = axios.create({
      baseURL: this.configService.get('NEWS_DATA_API_BASE_URL'),
      headers: { 'Content-Type': 'application/json' },
    });

    axiosClient.interceptors.response.use(
      response => {
        return response;
      },
      (error: AxiosError) => {
        throw error;
      },
    );

    return axiosClient;
  }

  private async validateRetrivedArticles(
    articles: INewsDataArticle[],
  ): Promise<CreateArticleDto[]> {
    return (
      await Promise.all(
        articles.map(
          async ({
            article_id,
            title,
            link,
            description,
            image_url,
            creator,
          }: ParsedArticleDto) => {
            const article = new ParsedArticleDto();

            article.article_id = article_id;
            article.title = title;
            article.link = link;
            article.description = description;
            article.image_url = image_url;
            article.creator = creator;

            const errors = await validate(article);
            if (errors.length > 0) {
              errors.map(error =>
                this.logger.warn(
                  `Article ${article_id} saving is failed, field ${this.hendleValidationError(error)}`,
                ),
              );

              return;
            }

            return article;
          },
        ),
      )
    ).filter(article => article);
  }

  private hendleValidationError(error: ValidationError): string {
    const constraints = Object.values(error.constraints).join(', ');

    return `${error.property}: ${constraints}`;
  }
}
