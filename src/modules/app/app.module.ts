import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { setupTypeOrmModule } from '@/plugins/typeORM';
import { DemoModule } from '@/modules/demo/demo.module';

@Module({
  imports: [
    setupTypeOrmModule(), // 数据库链接
    DemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
