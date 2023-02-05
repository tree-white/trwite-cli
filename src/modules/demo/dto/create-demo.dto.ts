// 针对 POST 方法使用的管道验证DTO
// 自定义验证请看 demo.pipe.ts 文件
// Swagger 接口文档通过装饰器来使用

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateDemoDto {
  @ApiProperty({ description: '姓名' })
  @IsString()
  name: string;

  @ApiProperty({ description: '年龄' })
  @IsNumber()
  age: number;
}
