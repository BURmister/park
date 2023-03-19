import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsModel } from 'src/news/news.model';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: NewsModel,
        schemaOptions: {
          collection: 'news',
        },
      },
    ]),
    ConfigModule,
  ],
})
export class NewsModule {}
