import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { validate as uuidValidate } from 'uuid';
import { TrackService } from 'src/track/track.service';

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

  constructor(private readonly trackService: TrackService) {}

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
}
