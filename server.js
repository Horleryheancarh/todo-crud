// IMPORTS
require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')


// PRESETS
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/',
    swagger: {
        info: {title: 'TODO-crud'}
    }
})
fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET
})
fastify.register(require('fastify-redis'), { host: process.env.HOST})

// MIDDLEWARES
fastify.register(require('./middleware/auth'))

// HOOKS
fastify.addHook('preValidation', async function (req, reply) {
    if (req.raw.url === '/item') {
      await fastify.jwtAuth
    }
  })

// ROUTES
fastify.register(require('./routes/userRoutes'))
fastify.register(require('./routes/itemRoutes'))


// DATABASE CONNECTION
mongoose.connect(process.env.DB_URI || 'mongodb+srv://yinka:passw07d@test.hqj3b.mongodb.net/test?authSource=admin&replicaSet=atlas-6ieg12-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database Successfully')
}).catch(e => {
    console.log(e, 'Failed to connect to Database')
    process.exit(1)
})


// START SERVER
const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0')
        fastify.log.info(`Server started at ${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error)
    }

}

start()
