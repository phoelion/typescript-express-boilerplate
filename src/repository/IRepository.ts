export default interface IRepository<T> {
  findByID(ID: string, projection?: string, relations?: string[]): Promise<T | null>;
  findOneByParams(params: Partial<T>, projection?: string, relations?: string[]): Promise<T | null>;

  findMany(
    params: Partial<T> | object,
    relations?: string[],
    projection?: string,
    sort?: string,
    pagination?: { page: number; limit: number } | undefined
  ): Promise<T[]>;

  create(params: Partial<T>): Promise<T>;

  updateOne(where: Partial<T>, updateData: Partial<T>): Promise<T | null>;
  updateMany(where: Partial<T>, updateData: Partial<T>): Promise<object>;

  deleteOneByID(ID: string): Promise<T | null>;
  deleteOne(params: Partial<T>): Promise<T | null>;

  deleteMany(where: Partial<T>): Promise<object>;

  // count(params:any):Promise<number>
}
