// TypeORM 自动引入实体,需要使用 Entity 实体装饰器启用, 然后在 demo.Module.ts 中引入实体,使用 forFeature() 方法注册

import {
  Entity, // 启用实体装饰器
  Column, // @Column() 表示引入列
  PrimaryGeneratedColumn, // @PrimaryGeneratedColumn() 自增生成列
  CreateDateColumn, // @CreateDateColumn() 自动生成创建日期列
  Generated, // @Generated() 自动生成UUID列
  OneToMany, // @OneToMany() 多表联查时用,表示
} from 'typeorm';
import { Tags } from './tags.entity';

enum Gender {
  '女',
  '男',
  '未知',
}

@Entity()
export class Demo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '姓名' })
  name: string;

  @Column()
  age: number;

  // @Generated('uuid')
  // uuid: string;

  // 使用枚举,可以使用TS的enum,需要声明"type=enum"
  // @Column({ type: 'enum', enum: Gender })
  // gender: number;

  // 查表时过滤字段不返回使用 select=false
  // @Column({ select: false })
  // password: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createTime: Date;

  // 可以存放数组
  // @Column('simple-array')
  // names: string[];

  // 可以存对象
  // @Column('simple-json')
  // json: object;

  // 一对多装饰区需要2个参数 [1]回调表示和哪个表关联 [2]反向关系回调表示和表中哪个字段关联
  @OneToMany(() => Tags, ({ demo }) => demo)
  tags: Tags[];
}
