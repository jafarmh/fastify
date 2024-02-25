
module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true })
  
  const bodyJsonSchema = {
    type: 'object',
    required: ['requiredKey'],
    properties: {
      someKey: { type: 'string' },
      someOtherKey: { type: 'number' },
      requiredKey: {
        type: 'array',
        maxItems: 3,
        items: { type: 'integer' }
      },
      nullableKey: { type: ['number', 'null'] }, // or { type: 'number', nullable: true }
      multipleTypesKey: { type: ['boolean', 'number'] },
      multipleRestrictedTypesKey: {
        oneOf: [
          { type: 'string', maxLength: 5 },
          { type: 'number', minimum: 10 }
        ]
      },
      enumKey: {
        type: 'string',
        enum: ['John', 'Foo']
      },
      notTypeKey: {
        not: { type: 'array' }
      }
    }
  }
  
  const queryStringJsonSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    },
    required:["name","excitement"]
  }
  
  const paramsJsonSchema = {
    type: 'object',
    properties: {
      par1: { type: 'string' },
      par2: { type: 'number' }
    }
  }
  
  const headersJsonSchema = {
    type: 'object',
    properties: {
      'x-foo': { type: 'string' }
    },
    required: ['x-foo']
  }
  
  const schema = {
    //body: bodyJsonSchema,
    querystring: queryStringJsonSchema,
    //params: paramsJsonSchema,
    headers: headersJsonSchema
  }
  
  fastify.get('/', { schema }, (request, reply) => {
    reply.send({ params: request.query }) // echo the querystring
  })


  
  // fastify.post('/' , (request, reply) => {
  //   request.raw.on('close', () => {
  //     if (request.raw.aborted) {
  //       app.log.info('request closed')
  //     }
  //   })

    
  //   console.log(request.body?.bodyData?.value,request.body?.someKey?.value ,'=====body')

  //   request.log.info('some info')
  //   reply.send({ params: request.query,body:request.body.bodyData?.value }) // echo the querystring
  // })

}