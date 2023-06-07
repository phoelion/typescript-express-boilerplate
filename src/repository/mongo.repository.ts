import { Model, model, Query } from 'mongoose';
import APIFeatures from '../utils/ApiFeatures';
import IRepository from './IRepository';

export default class MongoRepository<T> implements IRepository<T> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  findByID(ID: string, projection?: string, relations?: string[] | undefined): Promise<T | null> {
    const query = this.model.findById(ID);
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        query.populate(relation);
      });
    }
    if (projection && projection.length > 0) {
      query.select(projection);
    }
    return query.exec();
  }

  findOneByParams(params: Partial<T>, projection?: string, relations?: string[] | undefined): Promise<T | null> {
    const query = this.model.findOne(params);
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        query.populate(relation);
      });
    }
    if (projection && projection.length > 0) {
      query.select(projection);
    }
    return query.exec();
  }

  findMany(
    params: Partial<T> | object,
    relations?: string[],
    projection?: string,
    sort?: string,
    pagination?: { page: number; limit: number } | undefined
  ): Promise<T[]> {
    let query = this.model.find(params).select(projection);
    if (pagination) {
      const page = pagination.page || 1;
      const limit = pagination.limit || 100;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        query.populate(relation);
      });
    }

    return query.sort(sort).exec();
  }

  async create(params: Partial<T>): Promise<T> {
    const doc = this.model.create({ ...params });
    return doc;
  }

  updateOne(where: Partial<T>, updateData: Partial<T>): Promise<T | null> {
    const doc = this.model.findOneAndUpdate(where, updateData, { new: true, runValidators: true });
    return doc.exec();
  }

  updateMany(where: Partial<T>, updateData: Partial<T>): Promise<object> {
    const docs = this.model.updateMany(where, updateData);
    return docs.exec();
  }

  deleteOneByID(ID: string): Promise<T | null> {
    const doc = this.model.findByIdAndDelete(ID);
    return doc.exec();
  }

  deleteOne(params: Partial<T>): Promise<T | null> {
    const doc = this.model.findOneAndDelete(params);
    return doc.exec();
  }

  deleteMany(where: Partial<T>): Promise<object> {
    return this.model.deleteMany(where).exec();
  }
}
