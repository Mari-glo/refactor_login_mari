function auth(req, res, next) {
    console.log(req.session)
    if (req.session?.user ==='adminCoder@coder.com' && req.session?.admin ) {
        return next()
    }
        return res.status(401).send('error de autorización')
    
    
}

module.exports = {auth}