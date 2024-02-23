'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true,name:"jafar 1" }
  })
}

module.exports = async function (fastify, opts) {
  fastify.get('/users', function(req, reply) {
    fastify.mysql.query(
      'SELECT * FROM users', [],
      function onResult (err, result) {
        reply.send(err || result)
      }
    )
  })
}

