import * as bcrypt from 'bcrypt';

export const hashPassword = async (pass: string): Promise<string> => {
  return await bcrypt.hash(pass, 10);
};
