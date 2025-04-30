import { IService } from '../../interfaces/service.interface';
import { ITutorCreate } from './schemas/tutor-create-schema';
import { ITutor } from './schemas/tutor-schema';

export class TutorService implements IService {
  private tutores: ITutor[] = [
    {
      id: 1,
      nome: 'João',
      email: 'michels@cim.com',
      senha: '123456',
    },
  ];

  getAll(): ITutor[] {
    return this.tutores;
  }
  getById(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  create(data: ITutorCreate): ITutor {
    const newTutor: ITutor = {
      id: this.tutores.length + 1,
      ...data,
    };

    this.tutores.push(newTutor);
    return newTutor;
  }
  update(id: string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
