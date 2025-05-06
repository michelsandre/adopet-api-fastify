import { FastifyRequest, FastifyReply } from 'fastify';
import { IController } from '../../interfaces/controller.interface';
import { TTutorCreate } from './schemas/tutor-create-schema';
import { hashPassword } from '../../utils/hash-password';
import { TTutorUpdate } from './schemas/tutor-update-schema';
import { IService } from '../../interfaces/service.interface';

export class TutorController implements IController {
  constructor(private readonly service: IService) {}

  async getAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await this.service.getAll();
    reply.status(200).send(users);
  }
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;

    const user = await this.service.getById(+id);
    reply.status(200).send(user);
  }
  async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = req.body as TTutorCreate;
    const senhaHash = await hashPassword(data.senha);

    reply.status(201).send(await this.service.create({ ...data, senha: senhaHash }));
  }
  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;
    const data = req.body as TTutorUpdate;

    reply.status(200).send(await this.service.update(+id, data));
  }
  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const id = req.params.id;

    reply.status(200).send(await this.service.delete(+id));
  }
}
