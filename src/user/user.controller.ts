import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service'; // Correct Import for UserService
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) { } // Inject UserService

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('users')
  async findAllUsers() {
    try {
      return await this.userService.findAllUsers();
    } catch (error) {
      throw error;
    }
  }

  @Get('user/:UserId')
  async findUserById(@Param('UserId') UserId: number) {
    try {
      return await this.userService.findUserById(Number(UserId));
    } catch (error) {
      throw error;
    }
  }

  @Put('user/:UserId')
  async updateuserById(
    @Param('UserId') UserId: number,
    @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.updateuserById(
        UserId,
        updateUserDto
      );
    } catch (error) {
      throw error
    }
  }

  @Delete('user/:UserId')
  async deleteUserById(@Param('UserId') UserId: number) {
    try {
      return await this.userService.deleteUserById(Number(UserId));
    } catch (error) {
      throw error;
    }
  }
}

