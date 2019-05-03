export interface IService<T> {
  save(customer: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  getOne(id: string): Promise<T>;
  getAll(): Promise<T[]>;
}
