import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfigService } from './shared/services/database.config.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { UserprogressModule } from './userprogress/userprogress.module';
import { AuthModule } from './auth/auth.module';


@Module({
     imports: [
          ConfigModule.forRoot({
               isGlobal: true,
          }),

          SequelizeModule.forRootAsync({
               imports: [ConfigModule],
               useClass: DatabaseConfigService,
          }),

          UserModule,
          CourseModule,
          LessonModule,
          UserprogressModule,
          AuthModule,
        
     ],
     controllers: [AppController],
     providers: [
          AppService,
          {
               provide: APP_INTERCEPTOR,
               useClass: LoggingInterceptor,
          },
          {
               provide: APP_INTERCEPTOR,
               useClass: ResponseInterceptor,
          },
     ],
     exports: [],
})
export class AppModule {}

