import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { isValidObjectId, Types } from 'mongoose';

import { NewsModel } from './news.model';
import { NewsDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsModel)
    private readonly NewsModel: ModelType<NewsModel>,
  ) {}

  async getAll(searchTerm?: string | Types.ObjectId) {
    if (searchTerm) {
      if (isValidObjectId(searchTerm)) {
        return this.NewsModel.find({
          $or: [
            {
              _id: searchTerm,
            },
          ],
        }).exec();
      } else {
        return this.NewsModel.find({
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
    const product = await this.NewsModel.find().exec();
    return product;
  }

  async getById(_id: Types.ObjectId) {
    const product = await this.NewsModel.findOne({ _id }, '-__v');
    if (!product) throw new UnauthorizedException('Product not found');

    return product;
  }

  async addOne(dto: NewsDto) {
    const newProduct = new this.NewsModel(dto);
    const product = await newProduct.save();
    return product._id;
  }

  async editOne(_id: Types.ObjectId, dto: NewsDto) {
    const product = await this.getById(_id);

    if (dto.name) {
      product.name = dto.name;
    }

    if (dto.description) {
      product.description = dto.description;
    }

    if (dto.date) {
      product.date = dto.date;
    }

    await product.save();
    return product._id;
  }

  async deleteOne(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    await product.deleteOne();
    return product.name;
  }
}
