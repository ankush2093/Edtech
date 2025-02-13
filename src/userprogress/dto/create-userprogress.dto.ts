import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserprogressDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  UserID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  CourseID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  LessonID: number;

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

  @ApiProperty({ description: 'Indicates if the progress is active' })
  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;
}
