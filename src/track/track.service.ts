import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  //
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
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
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    //
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
    //
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    track.remove();

    const favorite = await this.favoritesService.findAll();
    if (favorite[0].tracks.includes(id)) {
      this.favoritesService.removeTrack(id);
    }
  }

  async removeArtist(id: string): Promise<void> {
    const result = await this.findAll();
    for (const track of result) {
      if (track.artistId === id)
        await this.update(track.id, { ...track, artistId: null });
    }
  }

  async removeAlbum(id: string): Promise<void> {
    const result = await this.findAll();
    for (const track of result) {
      if (track.albumId === id)
        await this.update(track.id, { ...track, albumId: null });
    }
  }
}
