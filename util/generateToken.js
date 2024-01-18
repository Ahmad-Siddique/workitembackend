const jwt = require('jsonwebtoken')


// First we give id..then secret key...then time after it expires
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}

module.exports=generateToken