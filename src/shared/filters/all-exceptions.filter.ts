import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
     constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

     catch(exception: any, host: ArgumentsHost): void {
          console.log(exception);
          const { httpAdapter } = this.httpAdapterHost;
          const ctx = host.switchToHttp();
          const httpStatusCode = exception.statusCode ? exception.statusCode : exception.getResponse() && exception.getResponse().statusCode ? exception.getResponse().statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

          let message: any = null;
          if (exception) {
               if (exception.errors) {
                    message = [];
                    exception.errors.map((error) => {
                         message.push(error);
                    });
               } else if (exception.response && exception.response.message) {
                    message = exception.response.message;
               } else if (exception.message) {
                    message = exception.message;
               } else {
                    message = 'Something went wrong. Please try again.';
               }
          } else {
               message = 'Something went wrong. Please try again.';
          }
          const response = {
               code: exception.code,
               status: false,
               message: message,
               data: [],
          };
          httpAdapter.reply(ctx.getResponse(), response, httpStatusCode);
     }
}
