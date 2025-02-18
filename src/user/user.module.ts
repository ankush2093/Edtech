// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
// import { User } from '../shared/models/user.model';

// @Module({
//   imports: [
//     SequelizeModule.forFeature([User])],
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UserModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../shared/models/user.model';
import { AuthModule } from '../auth/auth.module';  // ✅ Import AuthModule

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    AuthModule, // ✅ Import AuthModule which contains JwtService
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
