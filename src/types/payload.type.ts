import { RolesEnum } from '../enum/roles.enum';

export type TPayload = {
  id: number;
  nome: string;
  email: string;
  role?: RolesEnum;
};
