import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExceptionMessage } from 'src/utils/consts/ExceptionMessage';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { article_id } = createArticleDto;
    if (article_id && this.findOneByArticleId(article_id)) {
      throw new ConflictException(ExceptionMessage.ALREADY_EXIST);
    }

    const newArticle = this.articleRepository.create(createArticleDto);

    return await this.articleRepository.save(newArticle);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async findOneById(id: string): Promise<Article | null> {
    return await this.articleRepository.findOneBy({ id });
  }

  async findOneByArticleId(article_id: string): Promise<Article | null> {
    return await this.articleRepository.findOneBy({ article_id });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
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
