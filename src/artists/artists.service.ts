import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class ArtistsService {
  //
  private artistsArr: Artist[] = [
    {
      id: '40af606c-c0bb-47d1-bc20-a2857242cde4',
      name: 'Artist name',
      grammy: false,
    },
  ];

  async create(createArtistDto: CreateArtistDto) {
    if (createArtistDto.name === '') {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuidv4();
    const artist = new Artist(id, createArtistDto.name, createArtistDto.grammy);
    this.artistsArr.push(artist);
    return artist;
  }

  async findAll() {
    return this.artistsArr;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.artistsArr.filter((artist) => artist.id === id)[0];
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (updateArtistDto.name === '') {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.artistsArr.filter((artist) => artist.id === id)[0];
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. ArtistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.artistsArr.filter((artist) => artist.id === id)[0];
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    this.artistsArr = this.artistsArr.filter((artist) => artist.id !== id);
  }
}
