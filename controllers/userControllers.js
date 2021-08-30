const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

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
                isLoggedIn = {
                    isAuth: true,
                    name: user1.username,
                    email: user1.email
                }
                reply.send({ message: 'Log In successful'})
            }else {
                reply.code(300).send({message: 'Invalid password'})
            }
        }
    } catch (e) {
        reply.code(500).send(e)
    }
}

const logoutUser = async (req, reply) => {
    try {
        if(isLoggedIn.isAuth) {
            console.log(isLoggedIn)
            isLoggedIn = {
                isAuth: false,
                name: '',
                email: ''
            }
            console.log(isLoggedIn)
            reply.send({message: 'Logout successful'})
        } else {
            reply.send({message: 'You need to log in before you can logout'})
        }
    } catch (error) {
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}


module.exports = { signupUser, loginUser, logoutUser }