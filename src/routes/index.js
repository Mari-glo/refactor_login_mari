const { Router } = require('express')
//const userRouter = require('./users.router.js')
const cartsRouter = require('./carts.router.js')
const pruebasRouter = require('./pruebas.router.js')
const productsRouter = require('./products.router.js')
const viewsRouter = require('./views.router.js')
const messagesRouter = require('./messages.router.js')
const session = require('express-session')
const sessionsRouter = require('./session.router.js')
const UserRouter = require('./usersClass.router.js')




const router = Router()
const userRouter = new UserRouter()




router.use('/', viewsRouter)
router.use('/api/users', userRouter.getRouter())
router.use('api/carts', cartsRouter)
router.use('/api/products', productsRouter)
router.use('/api/message', messagesRouter)
router.use('/pruebas', pruebasRouter)
router.use('/api/sessions', sessionsRouter)



module.exports = router
