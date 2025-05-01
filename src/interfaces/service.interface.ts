export abstract class IService {
  abstract getAll(): Promise<any>;
  abstract getById(id: number | string): Promise<any>;
  abstract create(data: any): Promise<any>;
  abstract update(id: number | string, data: any): Promise<any>;
  abstract delete(id: number | string): Promise<any>;
}
