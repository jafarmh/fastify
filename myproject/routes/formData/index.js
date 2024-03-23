const Joi = require('joi')
const yup = require('yup')
const fs = require('fs')
const pump = require('pump')
const sharp = require('sharp');

module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/multipart'), {
    attachFieldsToBody: 'keyValues',
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100,     // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 10000000,  // For multipart forms, the max file size in bytes
      files: 1,           // Max number of file fields
      headerPairs: 2000,  // Max number of header key=>value pairs
      parts: 1000         // For multipart forms, the max number of parts (fields + files)
    }
  })

 
  const schema = {

    body: Joi.object().keys({
      mobile: Joi.number().required(),
      img: Joi.binary().required()
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
    sharp(file)
    .resize(320, 240)
    .toFile('uploads/output.jpg', (err, info,data ) => { 
     // fs.createWriteStream(`uploads/${data}`)
 
     });
     
    //const storedFile = fs.createWriteStream('./img-uploaded')
 
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