import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsInt, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLessonDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  CourseId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Content?: string;

  @ApiProperty({ description: 'Test cases in JSON format' })
  @IsOptional()
  @IsObject()
  TestCases?: object;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  Order?: number;
}
