const { getItems, getItem, postItem, deleteItem, updateItem } = require('../controllers/itemControllers')

// Item Schema
const Item = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        email: { type: 'string' },
        description: { type: 'string' },
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

    handler: getItems
}

// Get item
const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },

    handler: getItem
}

// Add item
const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: [ 'title', 'description' ],
            properties: {
                username: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
            }
        },
        response: {
            201: Item
        }
    },
    
    handler: postItem
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

    handler: deleteItem
}

// Update item
const updateItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },

    handler: updateItem
}

function itemRoutes (fastify, options, done) {
    // Get all items
    fastify.get('/items', getItemsOpts)

    // Get single item description
    fastify.get('/item/:title', getItemOpts)
    
    // Add item
    fastify.post('/item', postItemOpts)

    // Delete item
    fastify.delete('/item/:title', deleteItemOpts)

    // Update item
    fastify.put('/item/:title', updateItemOpts)

    done()
}

module.exports = itemRoutes
