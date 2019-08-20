const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
            // 'req.header' to access incoming headers, provide name of header that should be accessed
            // 'replace' to remove 'Bearer' in front of the token
            // if there is no Authorization-header 'token' is undefined, and replace throws an error, but there is already a catch-block in place                   
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // verify if the token is valid, by using verify() with token to be verified as first argument end secret as second argument (defined in User model)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
            // '_id' is stored on decoded, because it was used for creating the token with sign(). verify() gives back _id, iat, exp
            // check if token is still part of token-array, when user logs out the token gets deleted from array. set up of another property on this object
            // -> find a user with correct ID who has the auth-token still stored
            if(!user) {
                throw new Error()
                    // no error needs to be provided, because this is enough to trigger 'catch' below 
            }

            req.token = token
                // store token in 'req.token'
            req.user = user
                // user is stored in 'req.user', so it does not need to be found again later, which saves ressources
            next()
                // route handler should run, since user has proven authentication correctly
    } catch(e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth