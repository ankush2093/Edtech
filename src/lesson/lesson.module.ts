import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from 'src/shared/models/lesson.model';
import { Course } from 'src/shared/models';

@Module({
  imports: [
    SequelizeModule.forFeature([Lesson,Course]),
  ],

  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
