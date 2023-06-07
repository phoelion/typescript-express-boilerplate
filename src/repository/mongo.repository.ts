import { Model, model } from 'mongoose';
import APIFeatures from '../utils/ApiFeatures';

export default class MongoRepository {
  private model: Model<any>;
  constructor(model: Model<any>) {
    this.model = model;
  }
  public async findOne(params: any, popOptions?: any): Promise<any> {
    let query = this.model.findOne(params);
    if (popOptions) query = query.populate(popOptions);
    return query;
  }
  public async findByID(ID: string, popOptions?: any): Promise<any> {
    let query = this.model.findById(ID);
    if (popOptions) query = query.populate(popOptions);
    return query;
  }
  public async findMany(reqQuery: any, tourId?: string): Promise<any> {
    let filter = {};
    if (tourId) filter = { tour: tourId };

    const features = new APIFeatures(this.model.find(filter), reqQuery).filter().sort().limitFields().paginate();
    return await features.query;
  }
  public async createOne(params: any) {
    const doc = await this.model.create(params);
    return doc;
  }
  public async updateOne(ID: string, params: any) {
    return this.model.findByIdAndUpdate(ID, params, {
      new: true,
      runValidators: true,
    });
  }
  public async deleteOne(ID: string) {
    return this.model.findByIdAndDelete(ID);
  }
}
