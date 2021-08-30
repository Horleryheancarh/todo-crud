// IMPORTS
const dotenv = require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')


// PRESETS
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: {title: 'TODO-crud'}
    }
})
fastify.decorate('isLoggedIn', {
    isAuth: false,
    username: '',
    email: ''
})

// ROUTES
fastify.register(require('./routes/userRoutes'))
fastify.register(require('./routes/itemRoutes'))

fastify.get('/', (req, reply) => {
    reply.send({message: 'Welcome to my todo-crud backend API'})
})


// DATABASE CONNECT
mongoose.connect(process.env.DB_URI, {
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
        await fastify.listen(process.env.PORT)
    } catch (error) {
        fastify.log.error(error)
    }

}

start()