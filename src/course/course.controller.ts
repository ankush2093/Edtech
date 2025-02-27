import {Controller,Get,Post,Body,Param,Delete,Put,Query,} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('/')
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}

  @Post('course')
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    try {
      return await this._courseService.createCourse(createCourseDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('courses')
  async findAllCourses(@Query() paginationDto: PaginationDto) {
    try {
      return await this._courseService.findAllCourses(paginationDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('course/:CourseId')
  async findCourseById(@Param('CourseId') CourseId: number) {
    try {
      return await this._courseService.findCourseById(CourseId);
    } catch (error) {
      throw error;
    }
  }

  @Put('course/:CourseId')
  async updateCourseById(
    @Param('CourseId') CourseId: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    try {
      return await this._courseService.updateCourseById(
        CourseId,
        updateCourseDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete('course/:CourseId')
  async deleteCourseById(@Param('CourseId') CourseId: number) {
    try {
      return await this._courseService.deleteCourseById(CourseId);
    } catch (error) {
      throw error;
    }
  }
}
