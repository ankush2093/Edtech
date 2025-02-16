import { Module } from '@nestjs/common';
import { UserprogressService } from './userprogress.service';
import { UserprogressController } from './userprogress.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProgress } from 'src/shared/models/userprogress.model';
import { Course } from 'src/shared/models/course.model';
import { Lesson } from 'src/shared/models/lesson.model';
import { User } from 'src/shared/models';

@Module({
  imports: [
      SequelizeModule.forFeature([UserProgress,Course,Lesson,User]),
    ],
  controllers: [UserprogressController],
  providers: [UserprogressService],

})
export class UserprogressModule {}
