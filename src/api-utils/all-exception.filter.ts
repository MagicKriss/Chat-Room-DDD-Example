import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorApiResponseDTO } from './api.responses';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const dtoError = new ErrorApiResponseDTO();

    if (exception instanceof HttpException) {
      const exepitonResponse = exception.getResponse();

      dtoError.setStatus(exception.getStatus());

      if (exepitonResponse instanceof Object) {
        dtoError.setError(exepitonResponse);
      } else {
        dtoError.setMessage(exepitonResponse);
      }

      response.status(exception.getStatus()).json(dtoError);
      return;
    }

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    dtoError.setStatus(statusCode).setMessage('Internal Server Error');
    response.status(statusCode).json(dtoError);
  }
}
