import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ description: 'Artist New name', nullable: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Artist New grammy', nullable: true })
  @IsBoolean()
  grammy: boolean;
}
