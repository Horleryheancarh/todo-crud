const { signupUser, loginUser } = require('../controllers/userControllers')

// Schemas
const User = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        username: {type: 'string'},
        name: {type: 'string'},
        email: {type: 'string'},
    }
}

// SignUp
const signUp = {
    schema: {
        body: {
            type: 'object',
            required : ['name', 'username', 'email', 'password'],
            properties: {
                message: { type: 'string' }
            }
        },
        response: {
            200: User
        }
    },

    handler: signupUser
}

// Login
const logIn = {
    schema: {
        body: {
            type: 'object',
            required: [ 'username', 'password' ],
            properties: {
                username: { type: 'string' },
                password: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    token: { type: 'string' }
                }
            }
        }
    },

    handler: loginUser
}

function userRoutes (fastify, options, done) {

    // Signup user
    fastify.post('/signup', signUp)

    // Google Sign In

    // Login user
    fastify.post('/login', logIn)



    done()
}

module.exports = userRoutes