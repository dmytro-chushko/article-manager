import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';

import { IPaginatedArticles } from 'src/types';
import { ExceptionMessage } from 'src/utils/consts/ExceptionMessage';
import { FilesService } from '../files/files.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly fileService: FilesService,
  ) {}

  async createByParser(
    createArticleDto: CreateArticleDto,
  ): Promise<Article | void> {
    const { article_id, title } = createArticleDto;
    if (article_id && (await this.findOneByArticleId(article_id))) return;

    if (await this.findOneByTitle(title)) return;

    const newArticle = this.articleRepository.create(createArticleDto);

    return await this.articleRepository.save(newArticle);
  }

  async createByAdmin(
    createArticleDto: CreateArticleDto,
    image: Express.Multer.File,
  ): Promise<Article> {
    const newArticle = this.articleRepository.create(createArticleDto);

    if (image) {
      const savedArticle = await this.articleRepository.save(newArticle);
      const imagePath = await this.fileService.createFile(
        image,
        savedArticle.id,
      );

      return await this.articleRepository.save({
        ...savedArticle,
        image_url: imagePath,
      });
    }

    return await this.articleRepository.save(newArticle);
  }

  async findAll(queryParams: QueryParamsDto): Promise<IPaginatedArticles> {
    const options: FindManyOptions<Article> = {
      order: { updatedAt: 'DESC' },
    };

    if (queryParams.search) {
      options.where = { title: ILike(`%${queryParams.search}%`) };
    }

    if (queryParams.page && queryParams.limit) {
      const { page, limit } = queryParams;

      options.skip = +limit * (+page - 1);
      options.take = +limit;
    }

    if (queryParams.sort) {
      options.order = { updatedAt: queryParams.sort };
    }

    console.log(options);
    const [articles, total] =
      await this.articleRepository.findAndCount(options);
    const totalPages = queryParams.limit
      ? Math.ceil(total / queryParams.limit)
      : 1;

    return { articles, total, totalPages };
  }

  async findOneById(id: string): Promise<Article | null> {
    return await this.articleRepository.findOneBy({ id });
  }

  async findOneByArticleId(article_id: string): Promise<Article | null> {
    return await this.articleRepository.findOneBy({ article_id });
  }

  async findOneByTitle(title: string): Promise<Article | null> {
    return await this.articleRepository.findOneBy({ title });
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
    image: Express.Multer.File,
  ) {
    const article = await this.checkExistingAndReturn(id);

    if (image) {
      const imagePath = await this.fileService.createFile(image, article.id);

      return await this.articleRepository.save({
        ...article,
        ...updateArticleDto,
        image_url: imagePath,
      });
    }

    return await this.articleRepository.save({
      ...article,
      ...updateArticleDto,
    });
  }

  async remove(id: string): Promise<Article> {
    const article = await this.checkExistingAndReturn(id);

    return await this.articleRepository.remove(article);
  }

  private async checkExistingAndReturn(id: string): Promise<Article> {
    const article = await this.findOneById(id);
    if (!article) {
      throw new NotFoundException(ExceptionMessage.NOT_FOUND);
    }

    return article;
  }
}
