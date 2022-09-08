import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistsModule } from 'src/artists/artists.module';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([
      FavoriteArtist,
      FavoriteTrack,
      FavoriteAlbum,
      Artist,
      Track,
      Album,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
