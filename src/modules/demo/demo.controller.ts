import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';

// Swagger 接口文档配置,接口具体参数可以通过DTO来装饰,详情请到:dto/create-demo.dto.ts
import { ApiTags } from '@nestjs/swagger';

// import { DemoPipe } from './demo.pipe';
// 使用方法,例如: @Body(DemoPipe)

@ApiTags('demo')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  // 使用管道转换+DTO(Data Transform Object)验证
  @Post()
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto);
  }

  @Post('/bind')
  bindTag(@Body() params: { id: number; tags: string[] }) {
    return this.demoService.bindTags(params);
  }

  @Get()
  findAll() {
    return this.demoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demoService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id);
  }
}
