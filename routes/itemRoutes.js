const { getItems, getItem, postItem, deleteItem, updateItem } = require('../controllers/itemControllers')


// Item Schema
const Item = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        details: { type: 'string' },
        completed: { type: 'boolean' },
    }
}

// Get all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    },
}

// Get item
const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
}

// Add item
const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: [ 'details' ],
            properties: {
                details: { type: 'string' },
                completed: { type: 'boolean' },
            }
        },
        response: {
            201: Item
        }
    },
}

// Delete item
const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    },
}

// Update item
const updateItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
}


function itemRoutes(fastify, options, done) {
    // Get all items
    fastify.get('/item', {
        preValidation: fastify.jwtAuth, 
        schema: getItemsOpts.schema, 
        handler: getItems
    })

    // Get single item description
    fastify.get('/item/:title',{
        preValidation: fastify.jwtAuth,
        schema: getItemOpts.schema,
        handler: getItem
    })
    
    // Add item
    fastify.post('/item', {
        preValidation: fastify.jwtAuth,
        schema: postItemOpts.schema,
        handler: postItem
    })

    // Delete item
    fastify.delete('/item/:title', {
        preValidation: fastify.jwtAuth,
        schema: deleteItemOpts.schema,
        handler: deleteItem
    })

    // Update item
    fastify.put('/item/:title', {
        preValidation: fastify.jwtAuth,
        schema: updateItemOpts.schema,
        handler: updateItem
    })

    done()
}

module.exports = itemRoutes
