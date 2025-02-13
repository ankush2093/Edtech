import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  CreatorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Language: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  Price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Duration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Level: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  Rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Thumbnail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Tags: string;
}
