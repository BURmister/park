import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketsModel } from 'src/tickets/tickets.model';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TicketsModel,
        schemaOptions: {
          collection: 'tickets',
        },
      },
    ]),
    ConfigModule,
  ],
})
export class TicketsModule {}
