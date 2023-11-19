const passport = require('passport')
const local = require('passport-local')
const { userModel } = require('../Daos/Mongo/models/user.model.js')
const { createHash , isValidPass } = require('../utils/hash.js')

const LocalStrategy = local.Strategy

const initPassport =() => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_mane, email} = req.body
        try {
            let user = await userModel.findOne({email: email})
            if(user){
                console.log('usuario ya existe')
                return done(null, false)
            }
            const newUser = {
                first_name,
                last_mane,
                email,
                password: createHash(password)
            }
            let result = await userModel.create(newUser)
            return done(null, result)
            
        } catch (error) {
            return done(`error al obtener el usuario ${error}`)
            
        }

    }
))

passport.use('login', new LocalStrategy({
     usernameField: 'email'

    },async (username, password, done) => {
        try {
            const user = await userModel.findOne({email: username})
            if(!user){
                console.log("usuario no existe")
                return done(null, false)
            }
            if(!isValidPass(password, user)) return done (null, false)
            return done (null, user)
            
        } catch (error) {
            return done(error)
            
        }

    }
))

passport.serializeUser((user, done) => {
    done(null, user._id)

})

passport.deserializeUser(async ( id, done ) => {
    let user = await userModel.findById({_id:id})
    done(null, user)

})
}

module.exports = {initPassport}