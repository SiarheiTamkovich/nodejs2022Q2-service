import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: 'test_user', description: 'User login' })
  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @ApiProperty({ example: 'test_password', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
