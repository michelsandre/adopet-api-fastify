import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  // Tratamento de erros globais
  fastify.setErrorHandler((error, req, reply) => {
    if (error.statusCode === 404) reply.notFound(error.message);
    if (error.statusCode === 400) reply.badRequest(error.message);
    if (error.statusCode === 401) reply.unauthorized(error.message);

    reply.internalServerError(error.message);
  });
});
