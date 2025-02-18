import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserprogressDto, UpdateUserprogressDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserProgress } from 'src/shared/models/userprogress.model';
import { Course } from 'src/shared/models/course.model';
import { Lesson } from 'src/shared/models/lesson.model';
import { User } from 'src/shared/models';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class UserprogressService {
  constructor(@InjectModel(UserProgress) private _userProgressModel: typeof UserProgress,
    @InjectModel(Course) private _courseModel: typeof Course,
    @InjectModel(Lesson) private _lessonModel: typeof Lesson,
    @InjectModel(User) private _userModel: typeof User) { }

  public async createUserProgress(createUserprogressDto: CreateUserprogressDto) {
    try {
      const { UserId, CourseId, LessonId } = createUserprogressDto;

      // Check if the user exists and is active
      const user = await this._userModel.findOne({ where: { UserId: UserId, IsActive: true } });
      if (!user) {
        return { message: 'User not found or inactive', success: false };
      }

      // Check if the course exists and is active
      const course = await this._courseModel.findOne({ where: { CourseId: CourseId, IsActive: true } });
      if (!course) {
        return { message: 'Course not found or inactive', success: false };
      }

      // Check if the lesson exists and is active
      const lesson = await this._lessonModel.findOne({ where: { LessonId: LessonId, IsActive: true } });
      if (!lesson) {
        return { message: 'Lesson not found or inactive', success: false };
      }

      // Create user progress
      const userProgress = await this._userProgressModel.create(createUserprogressDto);
      return {
        message: 'User Progress created successfully',
        success: true,
        data: userProgress,
      };
    } catch (error) {
      throw error;
    }
  }

  public async findAllUserProgress(paginationDto: PaginationDto) {
    try {
      const { Page = 1, Limit = 10, Pagination = true } = paginationDto;
      const offset = (Page - 1) * Limit;
      const limit = Limit;

      const { count: total, rows: userProgress } = await this._userProgressModel.findAndCountAll({
        limit: Pagination ? Limit : undefined,   // Apply limit only if pagination is enabled
        offset: Pagination ? offset : undefined,   // Apply offset only if pagination is enabled
      });

      const totalPages = Pagination ? Math.ceil(total / Limit) : 1;
    
      const response = {
        message: userProgress.length > 0
          ? 'List of user progress fetched successfully.'
          : 'User Progress not found',
        data: {
          total,
          totalPages,
          currentPage: Page,
          perPage: Limit,
          userProgress,
        },
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  public async findUserProgressById(UserProgressId: number) {
    try {
      const userprogress = await this._userProgressModel.findByPk(UserProgressId);
      if (!userprogress || !userprogress.IsActive) {
        throw new NotFoundException(`UserProgress not found by UserProgressId ${UserProgressId}`)
      }
      return {
        message: `User Progress fetch sucessfully UserProgress Id ${UserProgressId}`,
        data: userprogress,
      };
    }
    catch (error) {
      throw error;
    }
  }

  public async updateUserProgressById(UserProgressId: number, updateUserprogressDto: UpdateUserprogressDto) {
    try {
      const userprogress = await this._userProgressModel.findByPk(UserProgressId);
      if (!userprogress || !userprogress.IsActive) {
        throw new NotFoundException('UserProgress not found by UserProgress Id')
      }
      await userprogress.update(updateUserprogressDto);
      const response = {
        message: 'UserProgress updated successfully',
        data: userprogress
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserProgressById(UserProgressId: number) {
    try {
      const userprogress = await this._userProgressModel.findByPk(UserProgressId);
      if (!userprogress || !userprogress.IsActive) {
        throw new NotFoundException('UserProgress not found by UserProgress Id')
      }
      await userprogress.update({ IsActive: false });
      const response = {
        message: 'UserProgress deleted successfully'
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

}
