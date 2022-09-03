import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistsService {
  //
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.artistRepository.create(createArtistDto);
    // eslint-disable-next-line prettier/prettier
    await this.artistRepository.save(newArtist)
    .catch(() => {
      throw new HttpException('Artist already exists!', HttpStatus.CONFLICT);
    });
    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
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

    const favorite = await this.favoritesService.findAll();
    if (favorite[0].artists.includes(id)) {
      this.favoritesService.removeArtist(id);
    }

    await this.trackService.removeArtist(id);
    await this.albumService.removeArtist(id);
  }
}
