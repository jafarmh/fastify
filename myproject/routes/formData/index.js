const Joi = require('joi')
const fs = require('fs')
const pump = require('pump')
module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/multipart'), {
    attachFieldsToBody: 'keyValues',
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100,     // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 1000000,  // For multipart forms, the max file size in bytes
      files: 1,           // Max number of file fields
      headerPairs: 2000,  // Max number of header key=>value pairs
      parts: 1000         // For multipart forms, the max number of parts (fields + files)
    }
  })

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
    required: ["name", "excitement"]
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
    body: Joi.object().keys({
      mobile: Joi.number().required(),
      img: Joi.binary()
    })
    ,
    //querystring: queryStringJsonSchema,
    //params: paramsJsonSchema,
    //headers: headersJsonSchema
  }

  fastify.post('/', {
    schema, validatorCompiler: ({ schema, method, url, httpPart }) => {
      return data => schema.validate(data)
    }
  }, async (req, reply) => {

    let file=Buffer.from(req.body.img)  ;
    console.log(file.mimetype);
    const storedFile = fs.createWriteStream('./img-uploaded.png')
   // let upload= await pump(file, storedFile)

    reply.send({ params: { mobile: req.body.mobile } }) // echo the querystring
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