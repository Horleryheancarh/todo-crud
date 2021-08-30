const Item = require('../models/ItemModel')


const getItems = async (req, reply) => {
    try {
        if(isLoggedIn.isAuth){
            const items = await Item.find({ email: isLoggedIn.email })
            reply.send(items)
        } else {
            reply.send({message: 'Please Login'})
        }
    } catch (e) {
        reply.code(401).send({message: "Unauthorized Access Please Login"})
    }
}


const getItem = async (req, reply) => {
    try {
        if(isLoggedIn.isAuth){
            const title = req.params.title
            const item = await Item.findOne({title: title, email: isLoggedIn.email})
            reply.send(item)
        } else {
            reply.send({message: 'Please Login'})
        }
    } catch (e) {
        console.log(e)
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}


const updateItem = async (req, reply) => {
    try {
        if(isLoggedIn.isAuth) {
            var item = req.body
            const title = req.params.title
            item.email = isLoggedIn.email
            await Item.findOneAndUpdate({ title: title, email: item.email }, item)
            const updatedItem = await Item.findOne({ title: item.title, email: item.email })
            reply.send(updatedItem)
        } else {
            reply.send({ message: 'You need to log in'})
        }
    } catch (e) {
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}


const postItem = async (req, reply) => {
    try {
        if(isLoggedIn) {
            if (isLoggedIn.isAuth) {
                var item = req.body
                item.email = isLoggedIn.email
                const newItem = await Item.create(item)
                reply.code(201).send(newItem)
            } else {
                reply.code(401).send({ message: 'Please Log In' })
            }
        } else {
            reply.code(401).send({ message: 'Please Log In' })
        }
    } catch (e) {
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}


const deleteItem = async (req, reply) => {
    try {
        if(isLoggedIn.isAuth) {
            await Item.findOneAndDelete({ title: req.params.title, email: isLoggedIn.email })
            reply.send({message: 'Deleted successfully'})
        } else {
            reply.send({ message: 'Please Log In' })
        }
    } catch (e) {
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}

module.exports = { getItems, getItem, postItem, deleteItem, updateItem }