import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Old password' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: 'New password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
