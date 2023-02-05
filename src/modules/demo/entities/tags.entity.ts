import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Demo } from './demo.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 多对一装饰器需要接收一个回调函数用于创建关联关系,返回要关联的实体
  @ManyToOne(() => Demo)
  demo: Demo;
}
