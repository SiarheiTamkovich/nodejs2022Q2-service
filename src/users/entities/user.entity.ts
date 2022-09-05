import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ description: 'User identifier', nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ description: 'User login', nullable: false })
  @Column({
    name: 'login',
    nullable: false,
    default: '',
    // unique: true,
  })
  login!: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @Column({
    name: 'password',
    nullable: false,
    default: '',
  })
  @Exclude()
  password!: string;

  @ApiProperty({ description: 'User refresh token', nullable: true })
  @Column({ name: 'token', nullable: true })
  @Exclude()
  refresh_token?: string;

  @ApiProperty({ description: 'User version', nullable: false })
  @VersionColumn()
  version: number;

  @ApiProperty({ description: 'User createdAt', nullable: false })
  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date;

  @ApiProperty({ description: 'User updatedAt', nullable: false })
  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date;
}
