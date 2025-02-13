import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'; // Assuming you're using Sequelize ORM
import { User } from '../shared/models/user.model'; // Import the User model
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,) { }

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      const response = {
        message: 'User created successfully',
        data: user,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findAllUsers() {
    try {
      const users = await this.userModel.findAll();
      const response = {
        message: 'Users retrieved successfully',
        data: users,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findUserById(UserId: number) {
    try {
      const user = await this.userModel.findOne({ where: { UserId: UserId } });
      return {
        message: user ? 'User fetched successfully.' : 'User not found',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateuserById(UserId: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findOne({ where: { UserId: UserId } });
      if (!user || !user.IsActive) {
        throw new NotFoundException('User not found by user Id ');
      }
      await user.update(updateUserDto);
      return {
        message: 'User updated successfully.',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserById(UserId: number) {
    try {
      const user = await this.userModel.findOne({ where: { UserId: UserId } });
      if (!user || !user.IsActive) {
        throw new NotFoundException('User not found by user Id');
      }
      await user.update({ IsActive: false });
      return {
        message: 'User deleted successfully',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }


}
