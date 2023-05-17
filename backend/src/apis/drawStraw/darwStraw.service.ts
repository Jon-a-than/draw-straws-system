import { Injectable } from '@nestjs/common'

@Injectable()
export class DrawStrawService {
  getHello(): string {
    return 'Hello World!'
  }
}
