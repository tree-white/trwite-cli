import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  // 1. 生成文档配置，支持链式访问,最后使用 build() 方法生成
  const swaggerOptions = new DocumentBuilder()
    .setTitle('文档标题')
    .setDescription('描述')
    .setVersion('1')
    .build();

  // 2. 创建 swagger 文档, 使用 静态方法 createDocument, 传入 app 和 文档配置
  const swagger = SwaggerModule.createDocument(app, swaggerOptions);

  // 3. 使用静态方法 setup 设置初始化文档，分别传入：打开路径，实例化app，文档
  SwaggerModule.setup('api-docs', app, swagger);
}
