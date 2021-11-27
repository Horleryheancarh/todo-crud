const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const fastifyJWT = require('fastify-jwt')

const signupUser = async (req, reply) => {

    try {
        const { name, username, email, password } = req.body
        const newUser = await User.findOne({ email: email })
        
        if (!newUser) {
            const newUser = await User.findOne({username: username})
            if (!newUser) {
                const hashed = await bcrypt.hash(password, 10)
                const newUser = await User.create({name: name, username: username, email: email, password: hashed})
                reply.send(newUser)
            } else {
                reply.code(500).send({message: 'Username exists Please Choose another'})
            }
        } else {
            reply.code(500).send({message: 'Email exists Please login'})
        }
    } catch (e) {
        reply.code(500).send(e)
    }
}

const loginUser = async (req, reply) => {

    try {
        const { username, password } = req.body
        const user = await User.find({ username: username })

        if (!user) {
            reply.code(300).send({message: 'Invalid Credentials'})
        } else {
            const user1 = user[0]
            const isValid = await bcrypt.compare(password, user1.password)

            if (isValid){
                // fastify.log.info(user1)
                const token = await reply.jwtSign({user1}, {expiresIn: 1800})
                reply.send({ message: 'Log In successful', token })
            }else {
                reply.code(300).send({message: 'Invalid password'})
            }
        }
    } catch (e) {
        reply.code(500).send(e)
    }
}

module.exports = { signupUser, loginUser }