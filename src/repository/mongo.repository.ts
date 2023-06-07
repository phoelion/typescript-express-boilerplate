import { Model, model } from 'mongoose';
import APIFeatures from '../utils/ApiFeatures';
import IRepository from './IRepository';

export default class MongoRepository<T> implements IRepository<T> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  findByID(ID: string, relations?: string[] | undefined): Promise<T | null> {
    const query = this.model.findById(ID);
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        query.populate(relation);
      });
    }
    return query.exec();
  }

  findOneByParams(params: Partial<T>, relations?: string[] | undefined): Promise<T | null> {
    const query = this.model.findOne({params});
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        query.populate(relation);
      });
    }
    return query.exec();
  }

  findManyByParams(params: Partial<T>, relations?: string[] | undefined): Promise<T[]> {
    const query = this.model.find({ params });
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        query.populate(relation);
      });
    }
    return query.exec();
  }


  async create(params: Partial<T>): Promise<T> {
    const doc = this.model.create({ ...params });
    return doc;
  }

  updateOne(where: Partial<T>, updateData: Partial<T>): Promise<T | null> {
    const doc = this.model.findOneAndUpdate(where, updateData ,{new:true , runValidators : true});
    return doc.exec()
  }

  updateMany(where: Partial<T>, updateData: Partial<T>): Promise<T[] | null> {
    const docs = this.model.updateMany( where, updateData)
    return docs.exec()
  }
  
  deleteOne(ID: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteMany(where: any): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  // public async findOne(params: any, popOptions?: any): Promise<any> {
  //   let query = this.model.findOne(params);
  //   if (popOptions) query = query.populate(popOptions);
  //   return query;
  // }
  // public async findByID(ID: string, popOptions?: any): Promise<any> {
  //   let query = this.model.findById(ID);
  //   if (popOptions) query = query.populate(popOptions);
  //   return query;
  // }
  // public async findMany(reqQuery: any, tourId?: string): Promise<any> {
  //   let filter = {};
  //   if (tourId) filter = { tour: tourId };

  //   const features = new APIFeatures(this.model.find(filter), reqQuery).filter().sort().limitFields().paginate();
  //   return await features.query;
  // }
  // public async createOne(params: any) {
  //   const doc = await this.model.create(params);
  //   return doc;
  // }
  // public async updateOne(ID: string, params: any) {
  //   return this.model.findByIdAndUpdate(ID, params, {
  //     new: true,
  //     runValidators: true,
  //   });
  // }
  // public async deleteOne(ID: string) {
  //   return this.model.findByIdAndDelete(ID);
  // }
}
