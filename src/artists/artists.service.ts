import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistsService {
  //
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    //
    const newArtist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(newArtist).catch(() => {
      throw new HttpException('Artist already exists!', HttpStatus.CONFLICT);
    });
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
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
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    artist.remove();
  }
}
