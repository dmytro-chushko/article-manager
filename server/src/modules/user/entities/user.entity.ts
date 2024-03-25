import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'User ID',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'ElonMask@gmail.com',
    description: 'User registration email',
  })
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'User registration password' })
  @Column({
    nullable: true,
    default: null,
  })
  password: string;
}
