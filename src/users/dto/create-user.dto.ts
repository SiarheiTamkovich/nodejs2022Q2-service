import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User login', nullable: false })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;
}
