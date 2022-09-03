import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track extends BaseEntity {
  //
  @ApiProperty({ description: 'Track identifier', nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Track name', nullable: true })
  @Column({
    name: 'name',
    nullable: false,
    default: '',
    //unique: true,
  })
  name!: string;

  @ApiProperty({ description: 'Artist ID', nullable: true })
  @Column({ nullable: true })
  artistId!: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist!: string;

  @ApiProperty({ description: 'Album ID', nullable: true })
  @Column({ nullable: true })
  albumId!: string;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album!: string;

  @ApiProperty({ description: 'Track duration', nullable: true })
  @Column({ nullable: true })
  duration: number;
}
