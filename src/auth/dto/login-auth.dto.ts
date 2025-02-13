import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  EmailId: string;

  @ApiProperty({ example: 'SecurePass@123', description: 'User password (hashed in backend)' })
  @IsString()
  @IsNotEmpty()
  Password: string;

}
