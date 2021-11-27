const fp = require('fastify-plugin')


module.exports = fp(async (fastify) => {
    fastify.decorate('jwtAuth', async (req, res) => {
        try {
            req.user = await req.jwtVerify()
            console.log(req.user)
        } catch (error) {
            res.send(error)
        }
    })
})