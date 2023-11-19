const { Router } = require ('express')
const { MessageManagerMongo } = require('../Daos/Mongo/managers/messageManager.js')
const { messagesModel } = require('../Daos/Mongo/models/messages.model.js')

const router = Router();
let messageServer = new MessageManagerMongo()


router.get('/', async (req, res) => { 
    try {
        let messages = await messagesModel.find(messages);
        res.send({ result: "Exito", payload: messages });
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    let { user, message } = req.body;
    if (!user || !message) {
        res.send({ status: "error", error: "Missing params" });
    }
    let result = await messagesModel.create({ user, message });
    res.send({ result: "Exito", payload: result });
});

router.put('/:id_message ', async (req, res) => {
    let { id_message  } = req.params;

    let messagesToReplace = req.body;
    if (!messagesToReplace.user || !messagesToReplace.message) {
        res.send({ status: "error", error: "Missing params" });
    }
    let result = await messagesModel.updateOne({ _id: id_message  }, messagesToReplace);
    res.send({ result: "Exito", payload: result });
});


router.delete('/:id_message ', async (req, res) => {
    let { id_message  } = req.params;
    let result = await messagesModel.deleteOne({ _id: id_message });
    res.send({ result: "Exito", payload: result });
});

module.exports = router