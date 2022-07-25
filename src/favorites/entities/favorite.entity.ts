import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorite {
  @ApiProperty({ description: 'Artists', nullable: true })
  artists: Artist[];
  @ApiProperty({ description: 'Albums', nullable: true })
  albums: Album[];
  @ApiProperty({ description: 'Tracks', nullable: true })
  tracks: Track[];

  constructor(artists = [], albums = [], tracks = []) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
