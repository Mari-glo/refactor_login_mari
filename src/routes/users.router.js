const { Router } = require ('express')
const { UserManagerMongo } = require('../Daos/Mongo/managers/userManager.js')
const { userModel } = require('../Daos/Mongo/models/user.model.js')
const { auth } = require('../middleware/authentication.js')
const { authToken } = require('../utils/jsonWebToken.js')

const router = Router()
let userService = new UserManagerMongo()

router.get('/', auth , async (req,res)=>{
    try {
        
        let users = await userService.getUsers()
        res.send({
            status:'success',
            payload: users
         })
        
    } catch (error) {
        console.log(error)
        
    }
    
})
router.post('/', async (req,res)=>{
    const newUser = req.body
    try {
        const {first_name, last_name, email, gender} = req.body
        if (!first_name || !last_name || !email) return res.send({status:'error', error:'datos incompletos'})
        let result = await userService.createUser(newUser)
        res.send({
            status:'success',
            payload: result
         })
        
    } catch (error) {
        console.log(error)
        
    }
    
})
router.put('/:uid', async(req,res)=>{
    try {
        
        let { uid } = req.params
        let userReplace = req.body
        if(!userReplace.first_name || !userReplace.last_name || userReplace.email) return res.send({status:'error', error:'datos incompletos'})
        let result = await userModel.updateOne({_id: uid, userReplace})
        res.send({status:'success', payload: result})
    } catch (error) {
        console.log(error)
      
}
})

router.delete('/:uid', async(req,res)=>{
    try {
        let { uid } = req.params
        let result = await userModel.deleteOne({_id: uid})
        res.send({status:'success', payload: result})
    } catch (error) {
        console.log(error)
      
}

})


module.exports = router