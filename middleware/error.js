const winston = require('winston')

module.exports= function(err, req, res, next) {
    res.status(500).send('something failed')
    winston.error(err.message, err)
    //types:
    // warn 
    // info 
    // varbose 
    // debug 
    // silly
}