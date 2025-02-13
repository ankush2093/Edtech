import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserprogressService } from './userprogress.service';
import { CreateUserprogressDto, UpdateUserprogressDto } from './dto';

@Controller()
export class UserprogressController {
  constructor(private readonly _userprogressService: UserprogressService) { }

  @Post('/userprogress')
  async createUserProgress(@Body() createUserprogressDto: CreateUserprogressDto) {
    try {
      const userprogress = await this._userprogressService.createUserProgress(createUserprogressDto);
      return userprogress;
    } catch (error) {
      throw error;
    }
  }

  @Get('/usersprogress')
  async findAllUserProgress() {
    try {
      const userprogress = await this._userprogressService.findAllUserProgress();
      return userprogress;
    } catch (error) {
      throw error;
    }
  }

  @Get('/userprogress/:UserProgressId')
  async findUserProgressById(@Param('UserProgressId') UserProgressId: number) {
    try {
      const userprogress = await this._userprogressService.findUserProgressById(UserProgressId);
      return userprogress;
    } catch (error) {
      throw error;
    }
  }

  @Put('/userprogress/:UserProgressId')
  async updateUserProgressById(
    @Param('UserProgressId') UserProgressId: number,
    @Body() updateUserprogressDto: UpdateUserprogressDto) {
    try {
      return await this._userprogressService.updateUserProgressById(
        UserProgressId,
        updateUserprogressDto
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete('/userprogress/:UserProgressId')
  async deleteUserProgressById(@Param('UserProgressId') UserProgressId: number) {
    try {
      const response = await this._userprogressService.deleteUserProgressById(UserProgressId);
      return response;
    } catch (error) {
      throw error;
    }
  }

}


