import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsInt, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  CourseId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Content: string;

  @ApiProperty({ description: 'Test cases in JSON format' })
  @IsNotEmpty()
  @IsObject()
  TestCases: object;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  Order: number;
}
