import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface ProductsModel extends Base {}

export class ProductsModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  date: string;

  @prop()
  description: string;

  @prop()
  free: boolean; 

  @prop()
  tickets: number;
}
