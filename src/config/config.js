const { connect } = require('mongoose')

const connectDb = async () => {
    try{
        console.log('Base de datos mariD conectada')    
        return await connect ('mongodb+srv://mariD:NOTpwuJtPwyuWFeU@cluster0.nn1ed1f.mongodb.net/ecommerce_mari?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error)
    }
}
module.exports = { connectDb }