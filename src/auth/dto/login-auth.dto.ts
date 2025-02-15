import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  EmailId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Password: string;

}
