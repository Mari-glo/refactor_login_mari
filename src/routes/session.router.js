const { Router } = require ('express')
const { userModel } = require('../Daos/Mongo/models/user.model.js')
const { createHash, isValidPass } = require('../utils/hash.js')
const passport = require('passport')
const { generateToken } = require('../utils/jsonWebToken.js')


const router = Router()


router.post('/login', async (req,res) => {
    const { email, password } = req.body
   
    // validar que venga email y password

    // buscar el usuario 
    const user = await userModel.findOne({email})
    // console.log('user Login',user)
    if (!user) return res.status(401).send({status: 'error', error: 'Usuario no existe'})

    if (!isValidPass(password, user)) {
        return res.status(401).send({status: 'error', error: 'Datos ingresados incorrectos'})
    }   

    const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: 'user'
    })
    
    
    // cookie 
    res.cookie('cookieToken', token, {
        maxAge: 60*60*10000,
        httpOnly: true
    }).status(200).send({
        status: 'success',
        // token: token,
        message: 'logueado correctamente'
    })

    
})

// http://localhost:8080/api/sessions /register
router.post('/register', async (req,res) => {
    try {
        const { first_name, last_name, email, password } = req.body
        // validar campos
        if (!first_name) {
            return res.send({status: 'error', error: 'completar todos los campos'})
        }
        const exists = await userModel.findOne({email})

        if (exists) return res.status(401).send({status: 'error', error: 'El usuario con el mail ingresado ya existe'})

        const newUser = {
            first_name,
            last_name,
            email, 
            password: createHash(password)
        }

        let result = await userModel.create(newUser)
        // validar result

        res.send({status: 'success', message: 'El ususario fue creado correctamente'})
    } catch (error) {
        console.log(error)
    }
    
})

//-----------------------github--------------------------
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req,res) =>{})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) =>{
    req.session.user = req.user
    res.redirect('/')
})

module.exports = router