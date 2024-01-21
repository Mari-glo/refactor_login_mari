const passport = require("passport");

exports.passportCall = strategy => {
    console.log(strategy)
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            console.log('user: ',user)
            if (err) return next(err)
            // aqui me saca 
            if(!user) return res.status(401).send({status: 'error', error: info.message ? info.message : info.toString()})    
            req.user = user
            next()
        })(req, res, next)
    }
}