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
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('Albums')
@ApiBearerAuth('token')
@Controller('album')
@UseGuards(AuthGuard)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Album,
    isArray: true,
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({ name: 'id', description: 'album ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'album ID' })
  @ApiOperation({ summary: `Update a album's information` })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete album` })
  @ApiParam({ name: 'id', description: 'album ID' })
  @ApiResponse({ status: 204, description: 'The album has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
