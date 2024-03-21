import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';

import { IResponseNewsData } from 'src/types';
import { NewsDataLang, NewsDataRoute } from 'src/utils/consts';

@Injectable()
export class ArticleParserService {
  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = this.createAxiosClient();
  }

  // @Interval(10000)
  // parseArticle() {
  //   this.fetchArticles<INewsDataArticle>();
  // }

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

    console.log(data);

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
