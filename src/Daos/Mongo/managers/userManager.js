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
    getUser = async (filter) => {
        return await this.model.findOne(filter)
    }
    async createUser(newUser){
        try {
            return await this.model.create(newUser)
        } catch (error) {
            console.log(error)             
        }
    }
    async updateUser({pid, userToUpdate}){
        return this.model.findByIdAndUpdate({_id: pid}, userToUpdate)
    }
    async deleteUser(pid){
        return this.model.findByIdAndDelete({_id: pid})
    }

}

module.exports = { UserManagerMongo }