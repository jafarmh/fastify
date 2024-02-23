'use strict'
 
module.exports = async function (fastify, opts) {
  fastify.addSchema({ $id: 'one', my: 'hello' })

  fastify.get('/', async function (request, reply) {
    reply.send(fastify.getSchemas())
    // return 'this is an example'
  })

 
 
  const options = {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          mobile: {
            type: 'string',

          },
        },
        required: ['mobile']
      }
    }
  }

  fastify.get('/valid', options, (request, reply) => {
    request.raw.on('close', () => {
      if (request.raw.aborted) {
        app.log.info('request closed')
      }
    })
    reply.send({ params: request.query }) // echo the querystring
  })



}
