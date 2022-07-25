import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { validate as uuidValidate } from 'uuid';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesService {
  //
  private favorites: Favorite = {
    artists: [
      {
        id: '40af606c-c0bb-47d1-bc20-a2857242cde4',
        name: 'Freddie Mercury',
        grammy: false,
      },
    ],
    albums: [
      {
        id: '40af606c-c0bb-47d1-bc20-a2857242cde5',
        name: 'Innuendo',
        year: 1991,
        artistId: '40af606c-c0bb-47d1-bc20-a2857242cde4',
      },
    ],
    tracks: [
      {
        id: '40af606c-c0bb-47d1-bc20-a2857242cde6',
        name: 'The Show Must Go On',
        artistId: '40af606c-c0bb-47d1-bc20-a2857242cde4',
        albumId: '40af606c-c0bb-47d1-bc20-a2857242cde5',
        duration: 262,
      },
    ],
  };

  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistsService,
  ) {}

  async findAll() {
    return this.favorites;
  }

  async addTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // eslint-disable-next-line prettier/prettier
    const track = this.trackService.trackArr.filter((track) => track.id === id)[0];
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.favorites.tracks.push(track);
    return track;
  }

  removeTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Track ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.favorites.tracks.filter((track) => track.id === id)[0];

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line prettier/prettier
    this.favorites.tracks = this.favorites.tracks.filter((track) => track.id !== id);
  }

  async addAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Album ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // eslint-disable-next-line prettier/prettier
    const album = this.albumService.albumsArr.filter((album) => album.id === id)[0];
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.favorites.albums.push(album);
    return album;
  }

  removeAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Album ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.favorites.albums.filter((album) => album.id === id)[0];

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line prettier/prettier
    this.favorites.albums = this.favorites.albums.filter((album) => album.id !== id);
  }

  async addArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Artist ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // eslint-disable-next-line prettier/prettier
    const artist = this.artistService.artistsArr.filter((artist) => artist.id === id)[0];
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.favorites.artists.push(artist);
    return artist;
  }

  removeArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Artist ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    // eslint-disable-next-line prettier/prettier
    const artist = this.favorites.artists.filter((artist) => artist.id === id)[0];

    if (!artist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line prettier/prettier
    this.favorites.artists = this.favorites.artists.filter((artist) => artist.id !== id);
  }
}
