
const fastifyPlugin = require('fastify-plugin')


/**
 * Connects to a Mysql database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function dbConnector (fastify, options) {
    fastify.register(require('@fastify/mysql'), {
        connectionString: process.env["DATABASE_URL"],
      })
  
}



// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)