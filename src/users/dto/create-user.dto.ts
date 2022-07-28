import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User login', nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  login: string;

  @ApiProperty({ description: 'User password', nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
