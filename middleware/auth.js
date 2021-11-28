const fp = require('fastify-plugin')


module.exports = fp(async (fastify) => {
    fastify.decorate('jwtAuth', async (req, res, done) => {
        try {
            req.user = await req.jwtVerify()
        } catch (error) {
            res.send(error)
        }

        done()
    })
})