const jwt = require('jsonwebtoken')

module.exports=function(req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).send({
            errorType: 'Token not Found',
            statusCode: 401,
            message: 'Insert a valid Access Token'
        })
}

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified

        next()
    } catch (e) {
        res.status(403).send({
            errorType: 'Token error',
            statusCode: 403,
            message: 'Expired of Invalid Token'
        })
    }
}