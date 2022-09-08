import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavoriteArtist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Artists', nullable: true, default: [] })
  @JoinColumn()
  artist: Artist;
}

@Entity()
export class FavoriteAlbum extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Albums', nullable: true, default: [] })
  @JoinColumn()
  album: Album;
}

@Entity()
export class FavoriteTrack extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => Track, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Tracks', nullable: true, default: [] })
  @JoinColumn()
  track: Track;
}
