
module.exports = function()  {
    if (!process.env.JWT_PRIVATE_KEY ) {
        throw new Error('Fatal Error : JWT_PRIVATE_KEY is not defined')
        process.exit(1)
    }
    
}