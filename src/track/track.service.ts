import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class TrackService {
  //
  private albumsArr: Track[] = [
    {
      id: '40af606c-c0bb-47d1-bc20-a2857242cde6',
      name: 'Track name',
      artistId: '40af606c-c0bb-47d1-bc20-a2857242cde4',
      albumId: '40af606c-c0bb-47d1-bc20-a2857242cde5',
      duration: 3600,
    },
  ];

  async create(createTrackDto: CreateTrackDto) {
    if (createTrackDto.name === '') {
      throw new HttpException(
        'Bad request. body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuidv4();
    const track = new Track(
      id,
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );
    this.albumsArr.push(track);
    return track;
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
    const track = this.albumsArr.filter((track) => track.id === id)[0];
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (updateTrackDto.name === '') {
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
    const track = this.albumsArr.filter((track) => track.id === id)[0];
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    return track;
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.albumsArr.filter((track) => track.id === id)[0];
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.albumsArr = this.albumsArr.filter((track) => track.id !== id);
  }
}
