import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ description: 'Album name', nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Album year', nullable: true })
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
}
