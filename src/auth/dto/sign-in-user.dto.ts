import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: 'user1', description: 'User login' })
  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @ApiProperty({ example: 'Password123*', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
