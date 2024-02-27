const Joi = require('joi')
const fs = require('fs')
const pump = require('pump')
module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/multipart'), { attachFieldsToBody: 'keyValues' })





  const schema = {
    body: Joi.object().keys({
      mobile: Joi.number().required(),
    })
    ,
    // querystring: queryStringJsonSchema,
    //params: paramsJsonSchema,
    // headers: headersJsonSchema
  }

  fastify.post('/', {
    schema, validatorCompiler: ({ schema, method, url, httpPart }) => {
      return data => schema.validate(data)
    }
  }, async (req, reply) => {



    reply.send({ params: { mobile: req.body } }) // echo the querystring
  })



  const schemaGet = {
    querystring: Joi.object().keys({
      mobile: Joi.number().required(),
    })
    ,
    // querystring: queryStringJsonSchema,
    //params: paramsJsonSchema,
    headers:  Joi.object().keys({
      'x-foo': Joi.string().required(),
    }).options({ allowUnknown: true })
  }

  fastify.get('/get', {
    schema: schemaGet, validatorCompiler: ({ schema, method, url, httpPart }) => {
        return data => schema.validate(data) 

    }
  }, async (req, reply) => {

    reply.send({ params: req.query }) // echo the querystring
  })





}