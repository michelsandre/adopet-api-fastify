export abstract class IService {
  abstract getAll(): Promise<object[]>;
  abstract getById(id: number | string): Promise<object>;
  abstract create(data: object): Promise<object>;
  abstract update(id: number | string, data: object): Promise<object>;
  abstract delete(id: number | string): Promise<any>;
}
