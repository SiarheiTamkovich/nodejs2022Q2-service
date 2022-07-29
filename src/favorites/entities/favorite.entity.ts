import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';

export class Favorite extends BaseEntity {
  //
  @ApiProperty({ description: 'Artists', nullable: true })
  artists: string[];

  @ApiProperty({ description: 'Albums', nullable: true })
  albums: string[];

  @ApiProperty({ description: 'Tracks', nullable: true })
  tracks: string[];
}
