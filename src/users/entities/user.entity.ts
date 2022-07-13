import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  id: number;
  @ApiProperty({ description: 'Note title', nullable: true })
  login: string;
  @ApiProperty({ description: 'Note content', nullable: true })
  password: string;

  constructor(id: number, login = '', password = '') {
    this.id = id;
    this.login = login;
    this.password = password;
  }
}
