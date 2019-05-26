import { HttpException, Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from 'express';

// leave catch empty to catch all types of exception
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    // ArgumentsHost is a wrapper for arguments passed to the original request handler
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
}
