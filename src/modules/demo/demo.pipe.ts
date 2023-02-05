// demo管道转换,通常特殊定义管道才需要用到该方式
// 因为官方已经考虑到复用性,所以在 @nestjs/common 中提供了 ValidationPipe 可在全局中用 use 使用
// 在 demo.controller.ts 引入

import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class DemoPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('>>>>>> Pipe-Value=>', value);
    console.log('>>>>>> Pipe-Metadata=>', metadata);

    // 获取 DTO 类后可以通过2个依赖库来进行严重处理
    // [1]class-transformer [2]class-validator
    // 安装指令：pnpm i -S class-validator class-transformer

    // 把DTO类实例化
    const DTO = plainToInstance(metadata.metatype, value);

    // 使用验证方法进行验证,如果有错误则会以数组形式返回
    const errors = await validate(DTO);
    if (errors.length) {
      // 如果要报错要中止,需要抛出一个 Http 请求来中止
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
