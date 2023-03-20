import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface TicketsModel extends Base {}

export class TicketsModel extends TimeStamps {
  @prop()
  eventId: string;

  @prop()
  name: string;

  @prop()
  date: string;

  @prop()
  time: string;

  @prop()
  buyerName: string;

  @prop()
  buyerTel: string;

  @prop()
  amount: number;
}
