import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsService } from 'src/artists/artists.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavoritesService {
  //
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly artistService: ArtistsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {
    this.initData();
  }

  private startData = {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    artists: [],
    albums: [],
    tracks: [],
  };

  async initData() {
    const favorite = await this.favoriteRepository.find();
    console.log(favorite);
    //if (!!favorite) favorite.save(this.startData);
  }

  async findAll() {
    return this.favoriteRepository.find();
  }

  async addTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const favoriteTrack = await this.favoriteRepository.find();

    //const favorite = this.startData;
    console.log(favoriteTrack);

    // return await this.favoriteRepository.save(favoriteTrack).catch(() => {
    //   throw new HttpException(
    //     'User login already exists!',
    //     HttpStatus.CONFLICT,
    //   );
    // });
  }

  removeTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Track ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async addAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Album ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = this.albumService.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  removeAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Album ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  async addArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Artist ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  removeArtist(id: string) {
    //
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Artist ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async removeAllData() {
    const favorite = await this.favoriteRepository.find();
    favorite[0].remove();
  }
}
