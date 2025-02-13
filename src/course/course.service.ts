import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from 'src/shared/models';

import { CreateCourseDto, UpdateCourseDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private _courseModel: typeof Course) {}

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

 public async findAllCourses() {
   try {
    const {count:total, rows:courses} = await this._courseModel.findAndCountAll()
    const response = {
      message : courses?'List of courses fetched successfully.':'Course not found',
      data:{
        total,
        courses
      }
    }
    return response;
   } catch (error) {
    throw error;
   }
  }

  public async findCourseById(CourseId: number) {
   try {
    const course = await this._courseModel.findByPk(CourseId)
    const response = {
      message : course?'Course fetched successfully.':'Course not found',
      data:course
    }
    return response;
   } catch (error) {
    throw error;
   }
  }

 public async updateCourseById(CourseId: number, updateCourseDto: UpdateCourseDto) {
   try {
    const course = await this._courseModel.findByPk(CourseId)
    if(!course || !course.IsActive){
      throw new NotFoundException('Course not found by course Id')
    }

    await course.update(updateCourseDto);
    const response = {
      message : 'Course updsted sucessfully. ',
      data:course
    }
    return response;
   } catch (error) {
    throw error;
   }
  }

 public async  deleteCourseById(CourseId: number) {
   try {
    const course = await this._courseModel.findByPk(CourseId)
    if(!course || !course.IsActive){
      throw new NotFoundException('Course not found by course Id')
    }
    course.update({IsActive:false})
    const response = {
      message: 'Course deleted successfully.'
    }
    return response;
   } catch (error) {
    throw error;
   }
  }
}
