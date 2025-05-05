import { join } from 'node:path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyServerOptions } from 'fastify';
import {
  FastifyPluginAsyncZod,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsyncZod<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // ### Place here your custom code!

  // Tratamento de erros globais
  fastify.setErrorHandler((error, req, reply) => {
    if (error.statusCode === 404) reply.notFound(error.message);
    if (error.statusCode === 400) reply.badRequest(error.message);
    if (error.statusCode === 401) reply.unauthorized(error.message);

    reply.internalServerError(error.message);
  });
  ///

  // Iniciarlizador do Zod

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.withTypeProvider<ZodTypeProvider>();

  // Fastify Swagger
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Adopet API',
        description: 'Desafio Alura Challenge Backend 6 ed - Adopet',
        version: '1.0.0',
        contact: {
          name: 'André Michels',
          url: 'https://github.com/michelsandre',
        },
      },
      servers: [],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    transform: jsonSchemaTransform,
    // transformObject: createJsonSchemaTransformObject({
    //   schemas: {
    //     TutorSchema: TutorSchema.omit({ senha: true }),
    //     TutorCreateSchema: TutorCreateSchema,
    //     TutorUpdateSchema: TutorUpdateSchema,
    //   },
    // }),
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/api',
    theme: {
      title: 'Adopet API',
    },
  });

  // ### Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app, options };
