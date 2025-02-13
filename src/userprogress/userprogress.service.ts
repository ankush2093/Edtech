import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserprogressDto, UpdateUserprogressDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserProgress } from 'src/shared/models/userprogress.model';

@Injectable()
export class UserprogressService {
  constructor(@InjectModel(UserProgress) private _userProgressModel: typeof UserProgress) { }


  public async createUserProgress(createUserprogressDto: CreateUserprogressDto) {
    try {
      const userprogress = await this._userProgressModel.create(createUserprogressDto);
      const response = {
        message: 'User Progress created successfully',
        data: userprogress,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findAllUserProgress() {
    try {
      const userprogress = await this._userProgressModel.findAll();
      const response = {
        message: userprogress ? 'List of userprogress fetched successfully.' : 'UserProgress not found',
        data: {
          userprogress,
        }
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findUserProgressById(UserProgressId: number) {
    try {
      const userprogress = await this._userProgressModel.findByPk(UserProgressId);
      const response = {
        message: userprogress ? 'UserProgress fetched successfully.' : 'UserProgress not found',
        data: userprogress
      }
      return response;
    }
    catch (error) {
      throw error;
    }
  }

  public async updateUserProgressById(UserProgressId: number, updateUserprogressDto: UpdateUserprogressDto) {
    try {
      const userprogress = await this._userProgressModel.findByPk(UserProgressId);
      if (!userprogress || !userprogress.IsActive) {
        throw new NotFoundException('UserProgress not found by UserProgress Id')
      }
      await userprogress.update(updateUserprogressDto);
      const response = {
        message: 'UserProgress updated successfully',
        data: userprogress
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserProgressById(UserProgressId: number) {
    try {
      const userprogress = await this._userProgressModel.findByPk(UserProgressId);
      if (!userprogress || !userprogress.IsActive) {
        throw new NotFoundException('UserProgress not found by UserProgress Id')
      }
      await userprogress.update({ IsActive: false });
      const response = {
        message: 'UserProgress deleted successfully'
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

}
