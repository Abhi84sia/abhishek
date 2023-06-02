const mongoose = require('mongoose')
const connect = require('./db')

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    createdAt:  
    {
        type:Date,
        default:Date.now,
        type:Date
    }
})

const user = mongoose.model('user',userSchema)
async function start(){
    try{
        await connect()
        console.log('Database is connected now')
    }catch(error){
        console.log('Database is not connected')
    }
}

start()

module.exports = user;
