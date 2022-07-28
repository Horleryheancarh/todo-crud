const Item = require('../models/ItemModel')


const getItems = async (req, reply) => {
    try {
        const items = await Item.find({ username: req.user.username })
        reply.send(items)
    } catch (error) {
        reply.code(401).send({message: "Unable to carry out operation", error})
    }
}


const getItem = async (req, reply) => {
    try {
        const id = req.params.id
        let test = await Item.findOne({ id, username: req.user.username })
        if (test){
            reply.send(test)
        } else {
            reply.code(400).send({message: "Item does not exist"})
        }
    } catch (e) {
        console.log(e)
        reply.code(401).send({message: "Unable to carry out operation", error: e})
    }
}


const updateItem = async (req, reply) => {
    try {
        var item = req.body
        const id = req.params.id
        let test = await Item.findOne({ id, username: item.username })
        if (test){
            await Item.findOneAndUpdate({ id, username: item.username }, item)
            const updatedItem = await Item.findOne({ id, username: item.username })
            reply.send(updatedItem)
        } else {
            reply.code(400).send({message: "Item does not exist"})
        }
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
        reply.code(401).send({message: "Unaable to carry out operation", error: e})
    }
}


const deleteItem = async (req, reply) => {
    try {
        let test = await Item.findOne({ id: req.params.id, username: req.user.username })
        if (test){
            const dbret = await Item.findOneAndDelete({ id: req.params.id, username: req.user.username })
            console.log(dbret)
            reply.send({message: 'Deleted successfully', item: dbret})
        } else {
            reply.code(400).send({message: "Item does not exist"})
        }
    } catch (e) {
        reply.code(401).send({message: "Unable to carryout operation", error: e})
    }
}

module.exports = { getItems, getItem, postItem, deleteItem, updateItem }