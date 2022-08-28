import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite extends BaseEntity {
  //
  @ApiProperty({
    example: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    description: 'Favorite identifier',
    nullable: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('simple-array')
  @ApiProperty({ description: 'Artists', nullable: true, default: [] })
  artists: string[];

  @Column('simple-array')
  @ApiProperty({ description: 'Albums', nullable: true, default: [] })
  albums: string[];

  @Column('simple-array')
  @ApiProperty({ description: 'Tracks', nullable: true, default: [] })
  tracks: string[];
}
