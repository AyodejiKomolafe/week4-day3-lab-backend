const database  = require("./db.json")
let houseID = 4;

module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(database)
    },

    deleteHouse: (req,res) => {
        let { id } = req.params;
        const houseToDelete = database.find((obj) => obj.id === parseInt(id));
        database.splice(id - 1, 1)
        res.status(200).send({message : "success", database})
    },
    createHouse: (req,res) => {
        console.log(req.body);
        const houseToAdd = {
            id: ++houseID,
            address: req.body.address,
            price: parseInt(req.body.price),
            imageURL: req.body.imageURL
        }
        database.push(houseToAdd)
        res.status(200).send(database)
    },
    updateHouse: (req,res) => {
        let {id} = req.params;
        const houseParam = {
            type: req.body.type
        }
        let houseIndex = database.findIndex((obj) => obj.id === parseInt(id));
        if(houseParam.type === "plus") {
            database[houseIndex].price += 10000;
            res.status(200).send(database)
        }else if(houseParam.type === "minus") {
            database[houseIndex].price -= 10000;
            res.status(200).send(database)
        }else {
            res.status(200).send(database)
        }
    }
}