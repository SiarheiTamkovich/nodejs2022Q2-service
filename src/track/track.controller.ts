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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Tracks')
@ApiBearerAuth('token')
@Controller('track')
@UseGuards(AuthGuard)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Track,
    isArray: true,
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiOperation({ summary: `Update a track's information` })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete track` })
  @ApiParam({ name: 'id', description: 'track ID' })
  @ApiResponse({ status: 204, description: 'The track has been deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
