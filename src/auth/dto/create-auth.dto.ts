import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UserName: string;
  
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  EmailId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  MobileNo?: string;
}
