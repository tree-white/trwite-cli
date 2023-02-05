import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Response } from './Response';
import { HttpFilter } from './Filter';

export function setupGlobalHooks(app: INestApplication) {
  // 使用官方提供的全局管道DTO验证
  app.useGlobalPipes(new ValidationPipe());
  // 注册全局响应拦截
  app.useGlobalInterceptors(new Response());
  // 注册全局异常过滤
  app.useGlobalFilters(new HttpFilter());
}
