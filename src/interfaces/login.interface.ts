export abstract class ILogin {
  abstract login(data: {
    email: string;
    senha: string;
  }): Promise<{ accessToken: string }>;
}
