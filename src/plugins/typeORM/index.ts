// 这里使用的 typeORM 配合 MySql 数据库进行项目初始
// 配置后在 app.module.ts 中解开注释即可

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeormForRootOptions = <TypeOrmModuleOptions>{
  type: 'mysql', // 数据库类型
  username: 'root', // 数据库管理员账号
  password: 'pgdnsjkmm..', // 数据库管理员密码
  host: '127.0.0.1', // host 主机
  port: 3306, // 端口
  database: 'trwite-server-dev', // 库名
  // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
  synchronize: true, // 是否自动将实体类同步到数据库
  retryDelay: 500, // 重试连接数据库间隔
  retryAttempts: 10, // 重试链接数据库次数
  autoLoadEntities: true, // [true]自动加载实体 forFeature()方法注册的每个实体都将自动添加配置到对象实体中
};

export function setupTypeOrmModule() {
  return TypeOrmModule.forRoot(typeormForRootOptions);
}
