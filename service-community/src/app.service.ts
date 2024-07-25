import { Injectable } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
