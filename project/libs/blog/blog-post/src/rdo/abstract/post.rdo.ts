import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Comment, Like } from '@project/core';

export abstract class PostRDO {
  @ApiProperty({
    type: 'string',
    description: 'Post ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    type: 'string',
    description: 'User ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public userId!: string;

  @ApiProperty({
    type: 'array',
    description: 'tag list',
    example: 'cat,dog,fox',
  })
  @Expose()
  public tags!: string[];

  @Expose()
  public comments!: Comment[];

  @Expose()
  public likes!: Like[];
}