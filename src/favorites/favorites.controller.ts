import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorite } from './entities/favorite.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Favorite,
    isArray: true,
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiOperation({ summary: 'Add track to the favorites' })
  addTrack(@Param('id') id: string) {
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
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }
}
