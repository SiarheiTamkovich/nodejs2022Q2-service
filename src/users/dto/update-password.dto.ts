import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'old password' })
  oldPassword: string;

  @ApiProperty({ description: 'User password' })
  newPassword: string;
}
