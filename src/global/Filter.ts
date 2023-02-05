// 定义全局异常拦截器
// 使用 ExceptionFilter

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // 不需要使用 Injectable() 注入
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();

    // 获取 请求/响应 数据
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // 获取异常状态
    const status = exception.getStatus();
    // 返回内容
    response.status(status).json({
      status,
      ts: +new Date(),
      message: exception.message,
      path: request.url,
    });
  }
}
