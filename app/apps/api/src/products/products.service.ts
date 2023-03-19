import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { isValidObjectId, Types } from 'mongoose';
import * as argon from 'argon2';

import { ProductsModel } from './products.model';
import { ProductsDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsModel)
    private readonly ProductsModel: ModelType<ProductsModel>,
  ) {}

  async getAll(searchTerm?: string | Types.ObjectId) {
    if (searchTerm) {
      if (isValidObjectId(searchTerm)) {
        return this.ProductsModel.find({
          $or: [
            {
              _id: searchTerm,
            },
          ],
        }).exec();
      } else {
        return this.ProductsModel.find({
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
    const product = await this.ProductsModel.find().exec();
    return product;
  }

  async getById(_id: Types.ObjectId) {
    const product = await this.ProductsModel.findOne({ _id }, '-__v');
    if (!product) throw new UnauthorizedException('Product not found');

    return product;
  }

  async addOne(dto: ProductsDto) {
    const newProduct = new this.ProductsModel(dto);
    const product = await newProduct.save();
    return product._id;
  }

  async editOne(_id: Types.ObjectId, dto: ProductsDto) {
    const product = await this.getById(_id);

    if (dto.name) {
      product.name = dto.name;
    }

    if (dto.description) {
      product.description = dto.description;
    }

    if (dto.free) {
      product.free = dto.free;
    }

    if (dto.tickets) {
      product.tickets = dto.tickets;
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
    product.tickets = product.tickets - 1;
    await product.save();
    return { _id: product._id, name: product.name };
  }

  async plus(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    product.tickets = product.tickets + 1;
    await product.save();
    return { _id: product._id, name: product.name };
  }
}
