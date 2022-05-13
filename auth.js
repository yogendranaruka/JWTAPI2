const jwt = require('jsonwebtoken')
const User = require('./mongoose')

// FORMAT OF TOKEN:>>>
// authorization : Bearer <access_token>

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    req.token = token

    if (token) {
        jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
            if (err)
                res.sendStatus(403)
        })
        next()

    } else {
        res.sendStatus(403)
    }
}

module.exports = auth;
