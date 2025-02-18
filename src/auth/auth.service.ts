import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthDto } from './dto';
import { LoginAuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../shared/models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService, 
  ) { }

  // Register User
  async registerUser(createAuthDto: CreateAuthDto) {
    const { EmailId, MobileNo, Password } = createAuthDto;
  
    // Check if email or mobile number already exists
    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [
          { EmailId },
          { MobileNo },
        ],
      },
    });
  
    if (existingUser) {
      if (existingUser.EmailId === EmailId) {
        throw new ConflictException('User with this email already exists');
      }
      if (existingUser.MobileNo === MobileNo) {
        throw new ConflictException('User with this mobile number already exists');
      }
      if (!existingUser.IsActive) {
        throw new UnauthorizedException('User is inactive. Please contact support.');
      }
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);
    // Create new user
    const user = await this.userModel.create({
      ...createAuthDto,
      Password: hashedPassword,
    });
  
    return {
      message: 'User registered successfully',
      userId: user.UserId,
      data: user,
    };
  }
  
  // Login User
  async loginUser(loginAuthDto: LoginAuthDto) {
    const user = await this.userModel.findOne({
      where: { EmailId: loginAuthDto.EmailId },
      attributes: { exclude: ['CreatedAt', 'UpdatedAt',] },
    });

    if (!user || !user.IsActive) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.Password,
      user.Password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload = { email: user.EmailId, sub: user.UserId };
    const accessToken = this.jwtService.sign(payload);

    // Remove password from user object
    // const userWithoutPassword = {...user.get(), Password: undefined};
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.Password;
    delete userWithoutPassword.IsActive;
    return {
      message: 'User logged in successfully',
      data: {
        'access-token': accessToken,
        user: userWithoutPassword,
      }
    };
  }

}