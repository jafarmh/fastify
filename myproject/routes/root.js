'use strict'

const { PrismaClient } = require('@prisma/client');
 
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true,name:"jafar 1" }
  })
}

module.exports = async function (fastify, opts) {
  fastify.get('/users',async function(req, reply) {
    // fastify.mysql.query(
    //   'SELECT * FROM users', [],
    //   function onResult (err, result) {
    //     reply.send(err || result)
    //   }
    // )
    const prisma = new PrismaClient()
    const users = await prisma.users.findMany({
     // where: { published: true },
     // include: { author: true },
    })

    console.log(users,'======================posts');
     reply.send(users)
  })
}

