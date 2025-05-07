export abstract class IService {
  abstract getAll(page?: number): Promise<object[] | object>;

  abstract getById(id: number | string): Promise<object>;

  abstract create(data: object): Promise<object>;

  abstract update(id: number | string, data: object): Promise<object>;

  abstract delete(id: number | string): Promise<{ message: string }>;
}
