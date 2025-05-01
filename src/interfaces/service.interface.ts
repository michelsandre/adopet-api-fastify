export abstract class IService {
  abstract getAll(): Promise<any>;
  abstract getById(id: number): Promise<any>;
  abstract create(data: any): Promise<any>;
  abstract update(id: string, data: any): Promise<any>;
  abstract delete(id: string): Promise<any>;
}
