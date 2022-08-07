import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({ description: 'Track name', nullable: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;

  @ApiProperty({ description: 'Album ID', nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null;

  @ApiProperty({ description: 'Album duration', nullable: true })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
