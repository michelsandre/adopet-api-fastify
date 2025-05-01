import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';
import { IService } from '../../interfaces/service.interface';
import { ITutorCreate } from './schemas/tutor-create-schema';
import { hashPassword } from '../../utils/hash-password';

export class TutorController implements IController {
  constructor(private readonly service: IService) {
    this.service = service;
  }

  async getAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await this.service.getAll();
    reply.status(200).send(users);
  }
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;

    try {
      const user = await this.service.getById(+id);
      reply.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) reply.notFound(error.message);
    }
  }
  async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = req.body as ITutorCreate;
    const senhaHash = await hashPassword(data.senha);

    reply
      .status(201)
      .send(await this.service.create({ ...data, senha: senhaHash }));
  }
  update(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
