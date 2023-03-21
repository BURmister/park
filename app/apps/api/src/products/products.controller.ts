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
import { ProductsDto } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/all')
  getAll(@Query('term') term?: string ) {
    return this.productsService.getAll(term);
  }

  @Get(':_id')
  byId(@Param('_id') _id: Types.ObjectId) {
    return this.productsService.getById(_id);
  }

  @Auth()
  @Post('/add')
  addOne(@Body() dto: ProductsDto) {
    return this.productsService.addOne(dto);
  }

  @Auth()
  @Put('/edit/:_id')
  @HttpCode(200)
  edit(@Param('_id') _id: Types.ObjectId, @Body() dto: ProductsDto) {
    return this.productsService.editOne(_id, dto);
  }

  @Auth()
  @Put('/delete/:_id')
  delete(@Param('_id') _id: Types.ObjectId) {
    return this.productsService.deleteOne(_id);
  }
}
