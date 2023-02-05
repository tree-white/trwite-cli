import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { Logger } from 'src/middleware/Logger';
import { Demo } from './entities/demo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Demo, Tags])],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule implements NestModule {
  /**
   * - 引入自定义中间件时不知道该方法可以使用 NestModule 类型约束来做提示
   * - 需要先引入中间件,再声明一个 configure 来配置中间件
   * - 通过 consumer.apply 来绑定中间件(此时绑定后并未生效)
   * - 要生效需要指定路由,通过 forRoutes 来绑定路由, 也就是 demo.controller 中的基本路由地址 @Controller('demo') 中的 'demo'
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      // 绑定中间件
      .apply(Logger)

      // 1. 整个路由配置中间件
      .forRoutes('demo');

    // 2. 对象形式配置,指定 POST 方法拦截
    // .forRoutes({ path: 'demo', method: RequestMethod.POST });

    // 3. 直接把整个 controller 塞进去
    // .forRoutes(DemoController);
  }
}
