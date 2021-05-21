const winston = require('winston');
require('winston-mongodb')
require('express-async-errors')

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtException.log'})
    )
    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, ex)
        process.exit(1)
    })

    winston.add(winston.transports.File, { filename: 'logfile.log'})
    winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost:27017/vidly',
    level: 'info'
} )

    
}