import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User identifier', nullable: false })
  id: string;
  @ApiProperty({ description: 'User login', nullable: true })
  login: string;
  @ApiProperty({ description: 'User password', nullable: true })
  password: string;
  @ApiProperty({ description: 'User version', nullable: true })
  version: number;
  @ApiProperty({ description: 'User createdAt', nullable: true })
  createdAt: number;
  @ApiProperty({ description: 'User updatedAt', nullable: true })
  updatedAt: number;

  constructor(id: string, login = '', password = '') {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Number(new Date());
    this.updatedAt = 0;
  }
}
