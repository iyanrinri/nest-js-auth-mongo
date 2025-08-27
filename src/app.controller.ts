import { Controller, Get, HttpCode, Param, ParseIntPipe, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/wildcard/*path')
  wildcard(@Req() request: Request, @Param('path') path: string): object {
    console.log(request.params.path); // misalnya "foo/bar/baz"
    return {
      message: "This is a wildcard route",
      path: path[0]
    };
  }

  @Get('/id/:id')
  @HttpCode(200)
  async getId(@Req() request: Request, @Param('id', ParseIntPipe) id: Number): Promise<object> {
    console.log(request.params); // misalnya "foo/bar/baz"
    return {
      id: id
    };
  }
}
