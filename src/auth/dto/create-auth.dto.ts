import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UserName: string;
  
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  EmailId: string;

  @ApiProperty({ example: 'SecurePass@123', description: 'User password (hashed in backend)' })
  @IsString()
  @IsNotEmpty()
  Password: string;

  @ApiProperty({ example: '+919876543210', description: 'User mobile number', required: false })
  @IsString()
  @IsOptional()
  MobileNo?: string;
}
