exports.authorization = role => {
    return async (req, res, next) => {
        try {
            if(!req.user) return res.status(401).send({status: 'error', error: 'Unauthorized'})
            
            if(req.user.role !== role) return res.status(403).send({status: 'error', error: 'Not permissions'})
            next()
        } catch (error) {
            console.log(error)
        }
    }
}