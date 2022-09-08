import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth('token')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    isArray: true,
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The track added',
  })
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204, description: 'The track has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track was not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @ApiParam({ name: 'id', description: 'album ID' })
  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album added',
  })
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @ApiParam({ name: 'id', description: 'album ID' })
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204, description: 'The album has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album was not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Album ID is invalid (not uuid)',
  })
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiParam({ name: 'id', description: 'artist ID' })
  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The artist created',
  })
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @ApiParam({ name: 'id', description: 'artist ID' })
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The artist has been deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist was not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Artist ID is invalid (not uuid)',
  })
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  // @Delete()
  // removeAll() {
  //   return this.favoritesService.removeAllData();
  // }
}
