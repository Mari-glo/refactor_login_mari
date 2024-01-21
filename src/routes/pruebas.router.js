const { Router } = require ('express')


const router = Router()


router.get('/diccionary/:word([a-zA-Z]+)', async (req, res) =>{
    const { word } = req.params
    res.send({word})
})

router.get('*', async(req,res)=>{
    res.status(404).send({status:'error', messagge: 'Ruta NO encontrada '})
})


router.get('/setcookies', async (req,res) => {
    res.cookie('mariCookie', 'info de la cookie', {maxAge: 500000}).send('cookie seteada')

})

router.get('/setsignedcookies', async (req,res) => {
    res.cookie('mariCookie', 'info de la cookie firmada por mari', {maxAge: 500000, signed: true}).send('cookie seteada')

})

router.get('/getcookies', async (req,res) => {
    console.log(req.cookies)
    res.send(req.cookies)

})

router.get('/getsignedcookies', async (req,res) => {
    console.log(req.signedCookies)
    res.send(req.signedCookies)

})

router.get('/deletecookies', async (req,res) => {
    res.clearCookie('mariCookie').send('cookie borrada')
})

router.get('/session', (req, res) =>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`has visitado el sitio ${req.session.counter} veces.`)
        
    } else {
        req.session.counter = 1
        res.send('<h2>Bienvenidos</h2>')
        
    }
})

router.post('/login', (req,res) => {
    const {email, password} = req.body
    
    if (email !== 'adminCoder@coder.com' || password !== 'adminCod3r123') {
        return res.send('login fallido')
    }
    
    req.session.user = email 
    req.session.admin = true
    res.send('login exitoso')
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) res.send({status:'logout error', error:err})
        res.send('logout exitoso')
    })
})



module.exports = router