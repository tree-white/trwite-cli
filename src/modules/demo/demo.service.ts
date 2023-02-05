import { Tags } from './entities/tags.entity';
import { Demo } from './entities/demo.entity';
import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Demo) private readonly demo: Repository<Demo>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}

  create(createDemoDto: CreateDemoDto) {
    const user = new Demo();
    Object.entries(createDemoDto).forEach(([key, value]) => {
      user[key] = value;
    });
    this.demo.save(user);

    return '创建成功';
  }

  async bindTags(params: { id: number; tags: string[] }) {
    // 找到 demo 对应 id 的数据
    const demo = await this.demo.findOne({ where: { id: params.id } });
    // 生成tag返回的是 promise 所以使用 Promise.all 等待所有返回再赋值
    const tags = await Promise.all(
      params.tags.map(async (tag) => {
        const T = new Tags();
        T.name = tag;
        await this.tags.save(T);
        return T;
      }),
    );

    demo.tags = tags;
    this.demo.save(demo);
    return '标签添加成功';
  }

  findAll() {
    return `This action returns all demo`;
  }

  findOne(id: number) {
    return this.demo.findOne({
      // 如果要获取"关系表"内容需要使用 relations 传递数组形式
      relations: ['tags'],
      where: { id },
    });
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
