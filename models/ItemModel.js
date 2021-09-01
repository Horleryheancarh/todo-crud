const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema ({
    id : {
        type: String,
    },
    title : {
        type: String,
    },
    email: {
        type: String,
    },
    subItems: {
        type: Array,
        properties: {
            details: String,
            completed: Boolean
        }
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item