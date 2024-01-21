const passport = require('passport')
const pjwt = require('passport-jwt')

const JWTStrategy = pjwt.Strategy
const ExtractJWT  = pjwt.ExtractJwt

const initializePassport = () => {
    // extraer el token de la cookie
    const cookieExtractor = req => {
        let token = null
        console.log('cookies extractor: ',req.cookies)
        if (req && req.cookies) {
            token = req.cookies['cookieToken']
            console.log('token extractor: ',token)
        }
        return token
    }
    //  middlewar passport   
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'SecretKeyQueFuncionaParaFirmarToken'
    }, async (jwt_payload, done) => {
        try {
            console.log('jwt_payload',jwt_payload)
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    // passport.serializeUser((user, done) => {
        
    // }
    // passport.deserializeUser(() => {}

}

module.exports = {
    initializePassport
}