const passport = require('passport')
const GithubStrategy = require('passport-github2')
const local = require('passport-local')
const { userModel } = require('../Daos/Mongo/models/user.model.js')
const  {UserManagerMongo}  = require('../Daos/Mongo/managers/userManager.js')
const { createHash , isValidPass } = require('../utils/hash.js')
const jwt = require ('passport-jwt')
const cookieParser = require('cookie-parser')
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

//const LocalStrategy = local.Strategy
const userService= new UserManagerMongo()

const initPassport =() => {

    const cookieEstractor = req => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['cookieToken']
        }
        return token
    }

    const objetStrategyJwt = {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieEstractor]),
        secretOrKey: 'FirmaSecretaParaTokenMariD'
    }

    passport.use('jwt',  new JWTStrategy(objetStrategyJwt, async (jwt_payload, done) =>{
        try {
           return done (null, jwt_payload) 
        } catch (error) {
            return done (error)
            
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.4040ecaece694a96',
        clientSecret: '361c4082cc4eb305f635d95b8bc28e45e0d90ad8',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async ( accessToken, refreshToken, profile, done) => {
        //console.log(profile)
       
          try {
            
            let user = await userService.getUser({email: profile._json.email})
            if (!user){
                let newUser = {
                    first_name: profile.username,
                    last_mane: profile.username,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userService.createUser(newUser)
                done(null, result)
              }
              else{
                done (null, user) 
              }
              
          } catch (error) {
              return done(error)
          }
    }))
}

    passport.serializeUser((user,done) => {
        done(null, user._id)
    })
    passport.deserializeUser( async (id, done) => {
        let user = await userService.getUser({_id: id})
        done (null, user)

    })

   

//      passport.use('register', new LocalStrategy({
//          passReqToCallback: true,
//          usernameField: 'email'
//      }, async (req, username, password, done) => {
//          const { first_name, last_mane, email} = req.body
//          try {
//              let user = await userModel.findOne({email: email})
//              if(user){
//                  console.log('usuario ya existe')
//                  return done(null, false)
//              }
//              const newUser = {
//                  first_name,
//                  last_mane,
//                  email,
//                  password: createHash(password)
//              }
//              let result = await userModel.create(newUser)
//              return done(null, result)
            
//          } catch (error) {
//              return done(`error al obtener el usuario ${error}`)
            
//          }

//      }
//  ))

//   passport.use('login', new LocalStrategy({
//        usernameField: 'email'

//       },async (username, password, done) => {
//           try {
//               const user = await userModel.findOne({email: username})
//               if(!user){
//                   console.log("usuario no existe")
//                   return done(null, false)
//               }
//               if(!isValidPass(password, user)) return done (null, false)
//               return done (null, user)
            
//           } catch (error) {
//               return done(error)
            
//           }

//       }
//   ))

module.exports = {initPassport}