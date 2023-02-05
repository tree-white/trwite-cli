import { INestApplication } from '@nestjs/common';
import * as cors from 'cors';

export function setupCors(app: INestApplication) {
  app.use(cors());
}
