// 定义全局的响应成功拦截器,统一请求返回的内容

import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Date<T> {
  data: T;
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Date<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 1,
          message: '请求成功',
          ts: +new Date(),
        };
      }),
    );
  }
}
