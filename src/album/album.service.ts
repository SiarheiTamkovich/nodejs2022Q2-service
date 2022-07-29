import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  //
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {

    const newAlbum = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(newAlbum).catch(() => {
      throw new HttpException(
        'User login already exists!',
        HttpStatus.CONFLICT,
      );
    });
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumsId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.albumRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    album.remove();
  }
}
