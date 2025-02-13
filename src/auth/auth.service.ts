import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthDto } from './dto';
import { LoginAuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../shared/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User, // Inject User model
    private jwtService: JwtService, // Inject JwtService
  ) {}

  // Register User
  async registerUser(createAuthDto: CreateAuthDto) {
    const existingUser = await this.userModel.findOne({
      where: { EmailId: createAuthDto.EmailId },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createAuthDto.Password, 10);

    // Create user
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
  });

  if (!user || !user.IsActive) {
    throw new NotFoundException('User not found');
  }
  // if (!user.IsActive) {
  //   throw new UnauthorizedException('User is inactive. Please contact support.');
  // }
  const isPasswordValid = await bcrypt.compare(
    loginAuthDto.Password,
    user.Password,
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid Password');
  }

  const payload = { email: user.EmailId, sub: user.UserId };
  const accessToken = this.jwtService.sign(payload); 

  return {
    message: 'User logged in successfully',
    data: {
      access_token: accessToken,
      user:user
    }
  };
}
}

// course create validation user