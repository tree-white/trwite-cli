import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupGlobalMiddleware } from './middleware/global';
import { setupSwagger } from './plugins/swagger';
import { setupCors } from './plugins/cors';
import { setupGlobalHooks } from './global/hooks';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 引入 cors 解决跨域
  setupCors(app);
  // 引入全局中间件
  setupGlobalMiddleware(app);
  // 引入全局Hook
  setupGlobalHooks(app);
  // 引入Swagger接口文档
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
