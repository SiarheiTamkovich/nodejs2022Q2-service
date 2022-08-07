import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ description: 'Album New name', nullable: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Album year', nullable: true })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string;
}
