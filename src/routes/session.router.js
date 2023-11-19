const { Router } = require ('express')
const { userModel } = require('../Daos/Mongo/models/user.model.js')
const { createHash, isValidPass } = require('../utils/hash.js')
const passport = require('passport')


const router = Router()


router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin' }), async (req, res) => {
    if(!req.user) return res.status(400).send({status:'error', error:'credenciales NO válidas' })
      
    req.session.user={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: 'admin'
    }
    res.send({status:'ok', payload: req.user})
})


router.post('/register', passport.authenticate('register', {
    failureRedirect:'/failregister'
}), async (req, res) => {
    res.send({status:'ok', message:'registro exitoso'})
    
})
router.get('/failregister', async (req , res) => {
    console.log('falló la estrategia')
    res.send({status:error, error:'estrategia fallada'})

})
router.get('/faillogin', async (req , res) => {
    console.log('falló el login')
    res.send({status:error, error:'estrategia fallada'})

})

router.post('/logout', (req, res) =>{
    res.send('cerrada la sesión')
})

module.exports = router