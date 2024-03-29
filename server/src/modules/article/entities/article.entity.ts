import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Article {
  @ApiProperty({
    description: 'Article ID',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Article ID from newsdata.io ',
    example: '9c321aa21d243e3eb912f40e355c0940',
  })
  @Column({ nullable: true })
  article_id: string;

  @ApiProperty({
    description: 'Article title',
    example:
      '1 of 6 former officers in Mississippi gets 40 years for racist torture of 2 Black men',
  })
  @Column({ nullable: true, length: 300 })
  title: string;

  @ApiProperty({
    description: 'Article link',
    example:
      'https://www.castanet.net/news/World/478029/1-of-6-former-officers-in-Mississippi-gets-40-years-for-racist-torture-of-2-Black-men',
  })
  @Column({ nullable: true })
  link: string;

  @ApiProperty({
    description: 'Article description',
    example: 'Article tells about something',
  })
  @Column({ nullable: true, length: 5000 })
  description: string;

  @ApiProperty({
    description: 'Article image',
    example:
      'https://www.castanet.net/content/2024/3/20240320140336-65fb2ca189b4f1ec23c51e10jpeg_p3773529.jpg',
  })
  @Column({ nullable: true })
  image_url: string;

  @ApiProperty({
    description: 'Article creators',
    example: '["Jhone Snow", "Alex Murphy" ]',
  })
  @Column('simple-array')
  creator: string[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
