import { INestApplication } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/** 全局中间件 */
function GlobalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('全局中间件');
  next();
}

export function setupGlobalMiddleware(app: INestApplication) {
  app.use(GlobalMiddleware);
}
