import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class AlbumService {
  //
  private albumsArr: Album[] = [
    {
      id: '40af606c-c0bb-47d1-bc20-a2857242cde5',
      name: 'Album name',
      year: 1971,
      artistId: '40af606c-c0bb-47d1-bc20-a2857242cde4',
    },
  ];

  async create(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.name === '' || createAlbumDto.year < 1900) {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuidv4();
    const album = new Album(
      id,
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    this.albumsArr.push(album);
    return album;
  }

  async findAll() {
    return this.albumsArr;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumsId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.albumsArr.filter((artist) => artist.id === id)[0];
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (updateAlbumDto.name === '') {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.albumsArr.filter((album) => album.id === id)[0];
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
    const album = this.albumsArr.filter((album) => album.id === id)[0];
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    this.albumsArr = this.albumsArr.filter((album) => album.id !== id);
  }
}
