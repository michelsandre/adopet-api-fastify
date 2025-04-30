export abstract class IService {
  abstract getAll(): any;
  abstract getById(id: string): any;
  abstract create(data: any): any;
  abstract update(id: string, data: any): any;
  abstract delete(id: string): void;
}
