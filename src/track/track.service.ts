import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  //
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    //
    const newTrack = this.trackRepository.create(createTrackDto);
    return this.trackRepository.save(newTrack).catch(() => {
      throw new HttpException('Track already exists!', HttpStatus.CONFLICT);
    });
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumsId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.trackRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    //
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;
    track.save();
    return track;
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Bad request. TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    track.remove();
  }
}
