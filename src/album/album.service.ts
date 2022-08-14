import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  //
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    //
    const newAlbum = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(newAlbum).catch(() => {
      throw new HttpException('Album already exists!', HttpStatus.CONFLICT);
    });
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    //
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
    album.save();
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

    await this.trackService.removeAlbum(id);

    const favorite = await this.favoritesService.findAll();
    if (favorite[0].albums.includes(id)) {
      this.favoritesService.removeAlbum(id);
    }
  }

  async removeArtist(id: string) {
    const result = await this.findAll();
    for (const album of result) {
      if (album.artistId === id)
        await this.update(album.id, { ...album, artistId: null });
    }
  }
}
