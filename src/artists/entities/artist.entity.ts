import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Artist extends BaseEntity {
  @ApiProperty({ description: 'Artist identifier', nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDType;

  @ApiProperty({ description: 'Artist name', nullable: false })
  @Column({
    name: 'name',
    nullable: false,
    default: '',
    unique: true,
  })
  name!: string;

  @ApiProperty({ description: 'Artist grammy', nullable: false })
  @Column({
    nullable: false,
    default: false,
  })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  albums!: string;
}
