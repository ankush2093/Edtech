import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'; // Assuming you're using Sequelize ORM
import { User } from '../shared/models/user.model'; // Import the User model
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private _userModel: typeof User,) { }

  public async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this._userModel.create(createUserDto);
      const response = {
        message: 'User created successfully',
        data: user,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findAllUsers(paginationDto: PaginationDto) {
    try {
      const { Page = 1, Limit = 10, Pagination = true } = paginationDto;
      const offset = (Page - 1) * Limit;
      const limit = Limit;

      const { count: total, rows: users } = await this._userModel.findAndCountAll({
        limit: Pagination ? limit : undefined,// Apply limit only if pagination is enabled
        offset: Pagination ? offset : undefined,// Apply offset only if pagination is enabled
        attributes: { exclude: ['Password'] },
      });
      const totalPages = Pagination ? Math.ceil(total / Limit) : 1;
      return {
        message: users.length > 0 ? 'List of users fetched successfully.' : 'User not found',
        data: {
          total,
          totalPages,
          currentPage: Page,
          perPage: Limit,
          users,
        }
      };
    } catch (error) {
      throw error;
    }
  }

 

  public async findUserById(UserId: number) {
    try {
      const user = await this._userModel.findOne({ 
        where: { UserId: UserId },
        attributes: { exclude: ['Password'] },
      });
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
      const user = await this._userModel.findOne({ where: { UserId: UserId } });
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
      const user = await this._userModel.findOne({ where: { UserId: UserId } });
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
