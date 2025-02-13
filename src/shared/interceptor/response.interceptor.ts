import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
     intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
          const request = context.switchToHttp().getRequest();
          const { method, path } = request;
          return next.handle().pipe(
               map((res: unknown) => this.responseHandler(res, context)),
               catchError((err: unknown) =>
                    throwError(() => {
                         console.log('In respoonse');
                         console.error(err);
                         if (err instanceof HttpException) {
                              return this.errorHandler(err, context);
                         } else {
                              return this.genericErrorHandler(err, context);
                         }
                    }),
               ),
          );
     }

     errorHandler(exception: HttpException, context: ExecutionContext) {
          const ctx = context.switchToHttp();
          const response: any = exception.getResponse();
          const statusCode = exception.getStatus();
          let errorMessage: string;

          if (typeof response === 'object' && response['message']) {
               if (typeof response['message'] === 'string') {
                    const match = response['message'].match(/`([^`]+)`/g);
                    if (match) {
                         const fields = match.map((m) => m.replace(/`/g, ''));
                         errorMessage = fields.join(', ');
                    } else {
                         errorMessage = response['message'];
                    }
               } else {
                    errorMessage = response['message'].toString();
               }
          } else {
               errorMessage = exception.message;
          }
          return {
               code: response.code ? response.code : statusCode,
               status: false,
               message: errorMessage,
               statusCode: statusCode,
               data: [],
          };
     }

     genericErrorHandler(err: any, context: ExecutionContext) {
          return {
               code: HttpStatus.INTERNAL_SERVER_ERROR,
               status: false,
               message: err.message || 'An unknown error occurred',
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               data: [],
          };
     }

     responseHandler(res: any, context: ExecutionContext) {
          const ctx = context.switchToHttp();
          const response = ctx.getResponse();
          if (res.code) {
               response.status(200);
          }
          return {
               code: res.code ? res.code : 200,
               status: res.status !== undefined ? res.status : true,
               message: res.message,
               data: res.data !== undefined ? res.data : [],
          };
     }
}
