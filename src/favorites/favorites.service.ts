import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  FavoriteArtist,
  FavoriteAlbum,
  FavoriteTrack,
} from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class FavoritesService {
  //
  constructor(
    @InjectRepository(FavoriteArtist)
    private readonly favoriteArtistRepository: Repository<FavoriteArtist>,
    @InjectRepository(FavoriteAlbum)
    private readonly favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteTrack)
    private readonly favoriteTrackRepository: Repository<FavoriteTrack>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.favoriteArtistRepository.find({
        relations: {
          artist: true,
        },
        cache: false,
      }),
      this.favoriteAlbumRepository.find({
        relations: {
          album: true,
        },
        cache: false,
      }),
      this.favoriteTrackRepository.find({
        relations: {
          track: true,
        },
        cache: false,
      }),
    ]);
    return {
      artists: artists.map(({ artist }) => artist),
      albums: albums.map(({ album }) => album),
      tracks: tracks.map(({ track }) => track),
    };
  }

  async addTrack(id: string) {
    //const track = await this.trackService.findOne(id);
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id: ${id} is not found`,
      );
    }
    const favoriteTrack = this.favoriteTrackRepository.create({ track });
    return this.favoriteTrackRepository.save(favoriteTrack);
  }

  async removeTrack(trackId: string) {
    const favoriteTrack = await this.favoriteTrackRepository.findBy({
      track: { id: trackId },
    });
    if (favoriteTrack.length === 0) {
      throw new UnprocessableEntityException(
        `Favorite track with id: ${trackId} is not found`,
      );
    }
    this.favoriteTrackRepository.remove(favoriteTrack, { transaction: false });
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Favorite artist with id: ${id} is not found`,
      );
    }
    const favoriteArtist = this.favoriteArtistRepository.create({ artist });
    return this.favoriteArtistRepository.save(favoriteArtist);
  }

  async removeArtist(artistId: string) {
    // eslint-disable-next-line prettier/prettier
    const favoriteArtist = await this.favoriteArtistRepository.findBy({
      artist: { id: artistId },
    });
    if (favoriteArtist.length === 0) {
      throw new UnprocessableEntityException(
        `Favorite artist with id: ${artistId} is not found`,
      );
    }
    // eslint-disable-next-line prettier/prettier
    this.favoriteArtistRepository.remove(favoriteArtist, { transaction: false });
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new UnprocessableEntityException(
        `Artist with id: ${id} is not found`,
      );
    }
    const favoriteAlbum = this.favoriteAlbumRepository.create({ album });
    return this.favoriteAlbumRepository.save(favoriteAlbum);
  }

  async removeAlbum(albumId: string) {
    // eslint-disable-next-line prettier/prettier
    const favoriteAlbum = await this.favoriteAlbumRepository.findBy({ 
      album: { id: albumId },
    });
    if (favoriteAlbum.length === 0) {
      throw new UnprocessableEntityException(
        `Album with id: ${albumId} is not found`,
      );
    }
    // eslint-disable-next-line prettier/prettier
    this.favoriteAlbumRepository.remove(favoriteAlbum, { transaction: false });
  }
}
