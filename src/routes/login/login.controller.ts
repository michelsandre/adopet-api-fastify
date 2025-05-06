import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginService } from './login.service';
import { TLogin } from '../../shared/login-schema';

export class LoginController {
  constructor(private service: LoginService) {}

  async loginUser(req: FastifyRequest<{ Body: TLogin }>, reply: FastifyReply): Promise<void> {
    const data = req.body;
    reply.status(200).send(await this.service.login(data));
  }

  async loginAdmin(req: FastifyRequest<{ Body: TLogin }>, reply: FastifyReply): Promise<void> {
    const data = req.body;
    reply.status(200).send(await this.service.login(data, true));
  }
}
