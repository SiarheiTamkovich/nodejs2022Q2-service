import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: 'string', description: 'User login' })
  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @ApiProperty({ example: 'string', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
