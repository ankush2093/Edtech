import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from 'src/shared/models';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private _courseModel: typeof Course) { }

  public async createCourse(createCourseDto: CreateCourseDto) {
    try {
      const course = await this._courseModel.create(createCourseDto);
      const response = {
        message: 'Course created successfull',
        data: course,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findAllCourses(paginationDto: PaginationDto) {
    try {
      const { Page = 1, Limit = 10, Pagination = true } = paginationDto;
      const offset = (Page - 1) * Limit;
      const limit = Limit;

      const { count: total, rows: courses } = await this._courseModel.findAndCountAll({
        limit: Pagination ? limit : undefined,  // Apply limit only if pagination is enabled
        offset: Pagination ? offset : undefined // Apply offset only if pagination is enabled
      });

      const totalPages = Pagination ? Math.ceil(total / Limit) : 1;

      const response = {
        message: courses.length > 0 
        ? 'List of courses fetched successfully.'
         : 'Course not found',
        data: {
          total,
          totalPages,
          currentPage: Page,
          perPage: Limit,
          courses,
        }
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findCourseById(CourseId: number) {
    try {
      const course = await this._courseModel.findByPk(CourseId)
      if (!course || !course.IsActive) {
        throw new NotFoundException(`Course not found by course Id ${CourseId}`)
      }
      const response = {
        message: 'Couuse fetched successfully.',
        data: course
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async updateCourseById(CourseId: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this._courseModel.findByPk(CourseId)
      if (!course || !course.IsActive) {
        throw new NotFoundException(`Course not found by course Id ${CourseId}`)
      }
      await course.update(updateCourseDto);
      const response = {
        message: 'Course updated sucessfully. ',
        data: course
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCourseById(CourseId: number) {
    try {
      const course = await this._courseModel.findByPk(CourseId)
      if (!course || !course.IsActive) {
        throw new NotFoundException(`Course not found by course Id ${CourseId}`)
      }
      course.update({ IsActive: false })
      const response = {
        message: 'Course deleted successfully.'
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
