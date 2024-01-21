const jwt = require('jsonwebtoken')

const private_key = 'FirmaSecretaParaTokenMariD'

const generateToken = (user) => {
    const token =  jwt.sign({user}, private_key, { expiresIn: '24h' })
    return token
}

const authToken = ( req, res, next) => {
    const authHeader = req.headers ['authoriation']
    if (!authHeader) {
        return res.status(401).json({status: 'error', error: ' No Autenticado'})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, private_key, (error, Credential) =>{
        if (error) {
            return res. status(403).json({status: 'error', error: 'No Autenticado'})
        }
        req.user = Credential.user
        next()
    })
}

module.exports = {
    generateToken,
    authToken
}