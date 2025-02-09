import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { COMMON_ERRORS } from '../common.types'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    const request = host.switchToHttp().getRequest<Request>()

    let status = 500
    let message = String(COMMON_ERRORS.INTERNAL_SERVER_ERROR)

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.message
    }

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
    })
  }
}
