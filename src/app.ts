import { join } from 'node:path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import {
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

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.withTypeProvider<ZodTypeProvider>();

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
  // Do not touch the following lines

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
