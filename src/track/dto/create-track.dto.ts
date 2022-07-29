import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ description: 'Track name', nullable: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  artistId: string;

  @ApiProperty({ description: 'Album ID', nullable: true })
  @IsNotEmpty()
  @IsString()
  albumId: string;

  @ApiProperty({ description: 'Album duration', nullable: true })
  duration: number;
}
