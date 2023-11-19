const { messageModel } = require("../models/messages.model.js");

class MessageManagerMongo {
  constructor(){
    this.model = messageModel
}
  
  async getMessages() {
      const messages = await this.model.find();
  
      return messages;
    }
  
    async saveMessage(message) {
      const newMessage = await this.model.create(message);
  
      return newMessage;
    }
  }

module.exports = { MessageManagerMongo }