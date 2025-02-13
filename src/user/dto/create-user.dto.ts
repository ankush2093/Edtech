import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UserName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  EmailId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  MobileNo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  IsActive: boolean;
}
