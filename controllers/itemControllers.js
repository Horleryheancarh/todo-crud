const Item = require('../models/ItemModel')


const getItems = async (req, reply) => {
    try {
        console.log(req.user)
        const items = await Item.find({ email: req.user.email })
        reply.send(items)
    } catch (e) {
        reply.code(401).send({message: "Unauthorized Access Please Login"})
    }
}


const getItem = async (req, reply) => {
    try {
        const title = req.params.title
        console.log(req.user)
        const item = await Item.findOne({title: title, email: isLoggedIn.email})
        reply.send(item)
    } catch (e) {
        console.log(e)
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}


const updateItem = async (req, reply) => {
    try {

        var item = req.body
        const title = req.params.title
        await Item.findOneAndUpdate({ title: title, email: item.email }, item)
        const updatedItem = await Item.findOne({ title: item.title, email: item.email })
        reply.send(updatedItem)
    } catch (e) {
        reply.code(401).send({message: e })
    }
}


const postItem = async (req, reply) => {
    try {
        var item = req.body
        const newItem = await Item.create(item)
        reply.code(201).send(newItem)
    } catch (e) {
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}


const deleteItem = async (req, reply) => {
    try {
        // await Item.findOneAndDelete({ title: req.params.title, email: isLoggedIn.email })
        reply.send({message: 'Deleted successfully'})
    } catch (e) {
        reply.code(401).send({message: "Unauthorized Access Please LogIn"})
    }
}

module.exports = { getItems, getItem, postItem, deleteItem, updateItem }