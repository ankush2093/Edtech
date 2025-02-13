import { Module } from '@nestjs/common';
import { UserprogressService } from './userprogress.service';
import { UserprogressController } from './userprogress.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProgress } from 'src/shared/models/userprogress.model';

@Module({
  imports: [
      SequelizeModule.forFeature([UserProgress]),
    ],
  controllers: [UserprogressController],
  providers: [UserprogressService],

})
export class UserprogressModule {}
