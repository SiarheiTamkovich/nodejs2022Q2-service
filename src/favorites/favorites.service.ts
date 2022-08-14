import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
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

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => AlbumService))
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
    if (!favorite[0]) this.favoriteRepository.save(this.startData);
  }

  async findAll() {
    return await this.favoriteRepository.find();
  }

  async addTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favorite = await this.favoriteRepository.find();
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    if (favorite[0].tracks.includes(id)) {
      throw new HttpException(
        'This track is already exists!',
        HttpStatus.CONFLICT,
      );
    }

    favorite[0].tracks.push(id);
    this.favoriteRepository.save(favorite);
    return favorite[0].tracks.filter((trackId) => trackId === id);
  }

  async removeTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Track ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const favorite = await this.favoriteRepository.find();
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    if (!favorite[0].tracks.includes(id)) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    favorite[0].tracks = favorite[0].tracks.filter((trackId) => trackId !== id);
    this.favoriteRepository.save(favorite);
  }

  async addAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Album ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const favorite = await this.favoriteRepository.find();
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    if (favorite[0].albums.includes(id)) {
      throw new HttpException(
        'This album is already exists!',
        HttpStatus.CONFLICT,
      );
    }

    favorite[0].albums.push(id);
    this.favoriteRepository.save(favorite);
    return favorite[0].albums.filter((albumId) => albumId === id);
  }

  async removeAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Album ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const favorite = await this.favoriteRepository.find();
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    if (!favorite[0].albums.includes(id)) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    favorite[0].albums = favorite[0].albums.filter((albumId) => albumId !== id);
    this.favoriteRepository.save(favorite);
  }

  async addArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Artist ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const favorite = await this.favoriteRepository.find();
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    if (favorite[0].artists.includes(id)) {
      throw new HttpException(
        'This artist is already exists!',
        HttpStatus.CONFLICT,
      );
    }

    favorite[0].artists.push(id);
    this.favoriteRepository.save(favorite);
    return favorite[0].artists.filter((artistId) => artistId === id);
  }

  async removeArtist(id: string) {
    //
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. Artist ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const favorite = await this.favoriteRepository.find();
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    if (!favorite[0].artists.includes(id)) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    favorite[0].artists = favorite[0].artists.filter(
      (artistId) => artistId !== id,
    );
    this.favoriteRepository.save(favorite);
  }

  // async removeAllData() {
  //   const favorite = await this.favoriteRepository.find();
  //   favorite[0].remove();
  // }
}
