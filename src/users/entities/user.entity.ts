import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';

export interface IUserResponse {
  id: UUIDType;
  login: string;
}

@Entity()
//@Unique(['login'])
export class User extends BaseEntity {
  @ApiProperty({ description: 'User identifier', nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  @ApiProperty({ description: 'User login', nullable: false })
  @Column({
    name: 'login',
    nullable: false,
    default: '',
    unique: true,
  })
  login!: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @Column({
    name: 'password',
    nullable: false,
    default: '',
  })
  password!: string;

  @ApiProperty({ description: 'User version', nullable: false })
  @Column({
    nullable: false,
    default: 1,
  })
  version: number;

  @ApiProperty({ description: 'User createdAt', nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'User updatedAt', nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;
}
