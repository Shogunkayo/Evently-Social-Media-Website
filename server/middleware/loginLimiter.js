import { rateLimit } from 'express-rate-limit'
import { logEvents } from './logger.js'

const loginLimiter = rateLimit({
    windowMs: 60*1000,
    max: 5,
    message: {
        message: 'Too many login attempts, please try again after few minutes'
    },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.nessage.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },

    standardHeaders: true,
    legacyHeaders: false
})

export default loginLimiter