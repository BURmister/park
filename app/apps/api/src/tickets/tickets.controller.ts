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
import { TicketsDto } from './tickets.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get('/all')
  getAll(@Query('searchTerm') searchTerm?: string | Types.ObjectId) {
    return this.ticketsService.getAll(searchTerm);
  }

  @Get(':_id')
  byId(@Param('_id') _id: Types.ObjectId) {
    return this.ticketsService.getById(_id);
  }

  @Post('/add')
  addOne(@Body() dto: TicketsDto) {
    return this.ticketsService.addOne(dto);
  }

  @Put('/edit/:_id')
  @HttpCode(200)
  edit(@Param('_id') _id: Types.ObjectId, @Body() dto: TicketsDto) {
    return this.ticketsService.editOne(_id, dto);
  }

  @Put('/delete/:_id')
  delete(@Param('_id') _id: Types.ObjectId) {
    return this.ticketsService.deleteOne(_id);
  }
}
