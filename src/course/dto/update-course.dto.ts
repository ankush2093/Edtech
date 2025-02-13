import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCourseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  Title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  CreatorId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Category?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Language?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Price?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Duration?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Level?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Rating?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Thumbnail?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Tags?: string;
}
