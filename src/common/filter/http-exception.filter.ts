import {ArgumentsHost, Catch, ExceptionFilter, HttpException,} from '@nestjs/common';
import {Request, Response} from 'express';
import {Logger} from '../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {

        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const logFormat =
            ` ================================================================
                Request original url: ${req.originalUrl}
                Method: ${req.method}
                IP: ${req.ip}
                Response: ${JSON.stringify(exception.getResponse(),)} \n  
              ================================================================`;

        Logger.error(logFormat);

        res.status(status).json(exception.getResponse());
    }
}
