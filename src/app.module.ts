import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
