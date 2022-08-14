import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist name', nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Artist grammy', nullable: false })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
