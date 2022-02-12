import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {

    this.logger.log(`${req.ip} ${req.method} ${req.originalUrl}`); //요청할 때 로깅

    res.on('finish', () => { //응답할 때 요청과 함께 로깅
      this.logger.log(`Req:[ ${req.ip} ${req.method} ${req.originalUrl} ] Res:[ ${res.statusCode} ]`);
    });

    next();
  }
}
