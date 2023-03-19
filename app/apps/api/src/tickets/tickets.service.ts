import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { isValidObjectId, Types } from 'mongoose';

import { TicketsModel } from './tickets.model';
import { TicketsDto } from './tickets.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(TicketsModel)
    private readonly TicketsModel: ModelType<TicketsModel>,
  ) {}

  async getAll(searchTerm?: string | Types.ObjectId) {
    if (searchTerm) {
      if (isValidObjectId(searchTerm)) {
        return this.TicketsModel.find({
          $or: [
            {
              _id: searchTerm,
            },
          ],
        }).exec();
      } else {
        return this.TicketsModel.find({
          $or: [
            {
              name: new RegExp(String(searchTerm), 'i'),
            },
            {
              category: new RegExp(String(searchTerm), 'i'),
            },
            {
              producer: new RegExp(String(searchTerm), 'i'),
            },
          ],
        }).exec();
      }
    }
    const product = await this.TicketsModel.find().exec();
    return product;
  }

  async getById(_id: Types.ObjectId) {
    const product = await this.TicketsModel.findOne({ _id }, '-__v');
    if (!product) throw new UnauthorizedException('Product not found');

    return product;
  }

  async addOne(dto: TicketsDto) {
    const newProduct = new this.TicketsModel(dto);
    const product = await newProduct.save();
    return product._id;
  }

  async editOne(_id: Types.ObjectId, dto: TicketsDto) {
    const product = await this.getById(_id);

    if (dto.buyerName) {
      product.buyerName = dto.buyerName;
    }

    if (dto.amount) {
      product.amount = dto.amount;
    }

    if (dto.buyerTel) {
      product.buyerTel = dto.buyerTel;
    }

    await product.save();
    return product._id;
  }

  async deleteOne(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    await product.deleteOne();
    return product.name;
  }

  async minus(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    product.amount = product.amount - 1;
    await product.save();
    return { _id: product._id, name: product.name };
  }

  async plus(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    product.amount = product.amount + 1;
    await product.save();
    return { _id: product._id, name: product.name };
  }
}
