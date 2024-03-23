'use strict'

 
const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const jsonParser = require('fast-json-body')
const querystring = require('node:querystring')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }



  
  // Handle multiple content types with the same function
  fastify.addContentTypeParser(['text/xml', 'application/xml'], function (request, payload, done) {
    xmlParser(payload, function (err, body) {
      done(err, body)
    })
  })
  
  // Async is also supported in Node versions >= 8.0.0
  fastify.addContentTypeParser('application/jsoff', async function (request, payload) {
    var res = await jsoffParserAsync(payload)
  
    return res
  })
 
  
  // Can use default JSON/Text parser for different content Types
  fastify.addContentTypeParser('text/json', { parseAs: 'string' }, fastify.getDefaultJsonParser('ignore', 'ignore'))
  
  fastify.addContentTypeParser('application/x-www-form-urlencoded', function (request, payload, done) {
 
    let body = ''
    payload.on('data', function (data) {
      body += data
    })
    payload.on('end', function () {
      try {
        const parsed = querystring.parse(body)
        done(null, parsed)
      } catch (e) {
        done(e)
      }
    })
    payload.on('error', done)
  })
 

}



module.exports.options = options
