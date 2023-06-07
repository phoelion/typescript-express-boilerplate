export default interface IRepository<T> {
  findByID(ID: string, relations?: string[]): Promise<T | null>;
  findOneByParams(params: Partial<T>, relations?: string[]): Promise<T | null>;
  findManyByParams(params: Partial<T>, relations?: string[]): Promise<T[]>;
  create(params: Partial<T>): Promise<T>;
  updateOne(where: Partial<T>, updateData: Partial<T>): Promise<T | null>;
  updateMany(where: Partial<T>, updateData: Partial<T>): Promise<T[] | null>;
  deleteOne(ID: string): Promise<boolean>;
  deleteMany(where: any): Promise<boolean>;

  // count(params:any):Promise<number>
}
