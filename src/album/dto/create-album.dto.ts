import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ description: 'Album name', nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Album year', nullable: true })
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  artistId: string;
}
