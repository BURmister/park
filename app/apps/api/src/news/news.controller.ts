import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { GetUser, GetAdmin } from '../auth/decorator/user.decorator';
import { Auth } from '../auth/guard/jwt.guard';
import { NewsDto } from './news.dto';
import { NewsService } from './news.service';

@Auth()
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/all')
  getAll(@Query('searchTerm') searchTerm?: string | Types.ObjectId) {
    return this.newsService.getAll(searchTerm);
  }

  @Get(':_id')
  byId(@Param('_id') _id: Types.ObjectId) {
    return this.newsService.getById(_id);
  }

  @Post('/add')
  addOne(@Body() dto: NewsDto) {
    return this.newsService.addOne(dto);
  }

  @Put('/edit/:_id')
  @HttpCode(200)
  edit(@Param('_id') _id: Types.ObjectId, @Body() dto: NewsDto) {
    return this.newsService.editOne(_id, dto);
  }

  @Put('/delete/:_id')
  delete(@Param('_id') _id: Types.ObjectId) {
    return this.newsService.deleteOne(_id);
  }
}
