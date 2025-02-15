import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserprogressDto {
  @ApiProperty({ description: 'ID of the user' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  UserID?: number;

  @ApiProperty({ description: 'ID of the course' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  CourseID?: number;

  @ApiProperty({ description: 'ID of the lesson' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  LessonID?: number;

  @ApiProperty({ description: 'Score of the user' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Score?: number;

  @ApiProperty({ description: 'Date when the lesson was completed' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  CompletedAt?: Date;

}
