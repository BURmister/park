import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface NewsModel extends Base {}

export class NewsModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  date: string;

  @prop()
  description: string;
}
