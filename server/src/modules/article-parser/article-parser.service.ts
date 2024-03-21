import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { INewsDataList, IResponseNewsData } from 'src/types';

@Injectable()
export class ArticleParserService {
  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = this.createAxiosClient();
    // this.fetchArticles<INewsDataList>();
  }

  @Interval(10000)
  parseArticle() {
    this.fetchArticles<INewsDataList>();
  }

  async fetchArticles<T>(): Promise<IResponseNewsData<T>> {
    const { data } = await this.axiosClient.get<IResponseNewsData<T>>('/news', {
      params: {
        apikey: 'pub_404100d3a7c802dc95e02e3221e8e5c1e4dce',
        language: 'en',
      },
    });

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
