import { ApiProperty } from '@nestjs/swagger';
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
export class Album extends BaseEntity {
  //
  @ApiProperty({
    example: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    description: 'Album identifier',
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  @ApiProperty({ description: 'Album name', nullable: true })
  @Column({
    name: 'name',
    nullable: false,
    default: '',
    unique: true,
  })
  name!: string;

  @ApiProperty({ description: 'Album year', nullable: true })
  @Column({
    nullable: false,
    default: 0,
  })
  year: number;

  @ApiProperty({
    example: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    description: 'ID of the Artist who owns the Album',
  })
  @Column({ nullable: true })
  artistId!: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist!: string;
}
