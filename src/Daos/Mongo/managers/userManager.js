const { userModel } = require("../models/user.model.js");

class UserManagerMongo{
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        try {
            return await this.model.find({})
        } catch (error) {
            console.log(error)            
        }
    }
    getUser = async (uid) => {
        return await this.model.findOne({_id: uid})
    }
    async createUser(newUser){
        try {
            return await this.model.create(newUser)
        } catch (error) {
            console.log(error)             
        }
    }
    async updateUser(){}
    async deleteUser(){}

}

module.exports = { UserManagerMongo }