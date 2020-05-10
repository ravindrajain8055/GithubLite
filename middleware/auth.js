const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    let token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            msg: 'unauthorized, no token'
        })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user

        next();
    } catch (err) {
        res.status(401).json({
            msg: "Token invalid"
        })
    }
}