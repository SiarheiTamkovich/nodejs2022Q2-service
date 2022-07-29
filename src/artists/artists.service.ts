import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  //
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    //
    const newArtist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(newArtist).catch(() => {
      throw new HttpException(
        'User login already exists!',
        HttpStatus.CONFLICT,
      );
    });
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.artistRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    //
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    artist.save();
    return artist;
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. ArtistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    artist.remove();
  }
}
