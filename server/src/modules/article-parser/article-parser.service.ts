import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios, { AxiosError, AxiosInstance } from 'axios';

import { INewsDataArticle, IResponseNewsData } from 'src/types';
import { NewsDataLang, NewsDataRoute } from 'src/utils/consts';
import { ArticleService } from '../article/article.service';

@Injectable()
export class ArticleParserService {
  axiosClient: AxiosInstance;

  constructor(private readonly articleService: ArticleService) {
    this.axiosClient = this.createAxiosClient();
  }

  @Interval(120000)
  async parseArticle() {
    const articles = await this.fetchArticles<INewsDataArticle>();
    const parsedArticles = await Promise.all(
      articles.results.map(
        async ({ article_id, title, link, description, image_url, creator }) =>
          await this.articleService.createByParser({
            article_id,
            title,
            link,
            description,
            image_url,
            creator: creator ? creator : [],
          }),
      ),
    );

    console.log(parsedArticles);
  }

  async fetchArticles<T>(): Promise<IResponseNewsData<T>> {
    const { data } = await this.axiosClient.get<IResponseNewsData<T>>(
      NewsDataRoute.NEWS,
      {
        params: {
          apikey: process.env.NEWS_DATA_API_KEY,
          language: NewsDataLang.EN,
        },
      },
    );

    console.log(data.results.length);

    return data;
  }

  private createAxiosClient(): AxiosInstance {
    const axiosClient = axios.create({
      baseURL: process.env.NEWS_DATA_API_BASE_URL,
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
}
