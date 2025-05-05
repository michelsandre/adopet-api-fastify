import * as bcrypt from 'bcrypt';

export const hashPassword = async (pass: string): Promise<string> => {
  return await bcrypt.hash(pass, 10);
};

export const validatePassword = async (pass: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(pass, hash);
};
