const mongoose = require('mongoose')
const MongoURL = "mongodb://localhost:27017/fianceflow"

const connectToMongo = () => {
    mongoose.connect(MongoURL).then(() => {

        console.log("monges is connected suessfully")
        
    }).catch((err) => {
        console.log(err)
    })
}


module.exports = connectToMongo;