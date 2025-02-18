import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto, UpdateLessonDto } from './dto';
import { Lesson } from '../shared/models/lesson.model';
import { Course } from '../shared/models/course.model';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationDto } from 'src/shared/dto/pagination.dto';


@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson) private _lessonModel: typeof Lesson,
    @InjectModel(Course) private _courseModel: typeof Course) { }

  public async create(createLessonDto: CreateLessonDto) {
    try {
      const course = await this._courseModel.findOne({
        where: { CourseId: createLessonDto.CourseId, IsActive: true },
      });

      if (!course) {
        throw new BadRequestException('Course not found or inactive');
      }

      const lesson = await this._lessonModel.create(createLessonDto);
      return {
        message: 'Lesson created successfully',
        data: lesson,
      };
    } catch (error) {
      throw error;
    }
  }

  public async findAllLessons(paginationDto:PaginationDto) {
    try {
      const { Page = 1, Limit = 10, Pagination = true } = paginationDto;
      const offset = (Page - 1) * Limit;
      const limit = Limit;

      const {count:total, rows:lessons} = await this._lessonModel.findAndCountAll({
        limit: Pagination ? limit : undefined,
        offset: Pagination ? offset : undefined,  
      });
      const totalPages = Pagination ? Math.ceil(total / Limit) : 1;

      const response = {
        message: lessons.length > 0
        ? 'List of lessons fetched successfully.' 
        : 'Lesson not found',
        data: {
          total,
          totalPages,
          currentPage: Page,
          perPage: Limit,
          lessons,
        }
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findLessonById(LessonId: number) {
    try {
      const lesson = await this._lessonModel.findByPk(LessonId);
      if (!lesson || !lesson.IsActive) {
        throw new NotFoundException(`Lesson not found by lesson Id ${LessonId}`);
      }
      return {
        message: lesson ? 'Lesson fetched successfully.' : 'Lesson not found',
        data: lesson,
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateLessonById(LessonId: number, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = await this._lessonModel.findByPk(LessonId); // Use lessonId here
      if (!lesson || !lesson.IsActive) {
        throw new NotFoundException(`Lesson not found by lesson Id ${LessonId}`);
      }
      await lesson.update(updateLessonDto);
      return {
        message: 'Lesson updated successfully.',
        data: lesson,
      };
    } catch (error) {
      throw error;
    }
  }

  public async deleteLessonById(LessonId: number) {
    try {
      // const lesson = await this._lessonModel.findByPk(LessonId);
      const lesson = await this._lessonModel.findOne({ where: { LessonId } });
      if (!lesson || !lesson.IsActive) {
        throw new NotFoundException(`Lesson not found by lesson Id ${LessonId}`);
      }
      lesson.update({ IsActive: false });
      const response = {
        message: 'Lesson deleted successfully.',
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
