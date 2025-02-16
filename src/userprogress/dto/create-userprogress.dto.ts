import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserprogressDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  UserId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  CourseId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  LessonId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Score?: number;

  @ApiProperty({ description: 'Completion date of the lesson (optional)' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  CompletedAt?: Date;


}
