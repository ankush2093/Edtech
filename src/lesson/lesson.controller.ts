import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto } from './dto';
import { PaginationDto } from '../shared/dto/pagination.dto';

@Controller('/')
export class LessonController {
  constructor(private readonly _lessonService: LessonService) { }

  @Post('lesson')
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    try {
      return await this._lessonService.create(createLessonDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('lessons')
  async findAllLessons(@Query() paginationDto: PaginationDto) {
    try {
      return await this._lessonService.findAllLessons(paginationDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('lesson/:LessonId')
  async findLessonById(@Param('LessonId') LessonId: number) {
    try {
      const result = await this._lessonService.findLessonById(LessonId);
      return {
        code: 200,
        status: true,
        message: result.message,
        data: result.data || [],
      };
    } catch (error) {
      throw error;
    }
  }

  @Put('lesson/:lessonId')
  async updateLessonById(
    @Param('lessonId') lessonId: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    try {
      return await this._lessonService.updateLessonById(
        lessonId,
        updateLessonDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete('lesson/:LessonId')
  async deleteLessonById(@Param('LessonId') LessonId: number) {
    try {
      return await this._lessonService.deleteLessonById(LessonId);
    } catch (error) {
      throw error;
    }
  }
}

