import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
     constructor(message: any, statusCode: number = 400, casue: any) {
          super(message, statusCode, casue);
     }
}
