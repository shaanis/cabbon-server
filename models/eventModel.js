const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    finetime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"ongoing"
    },
    userToken:{
        type:String
    },
    userId:{
       type: mongoose.Schema.Types.ObjectId, ref: 'boys' 
    },
})

const events = mongoose.model("events",eventSchema)
module.exports = events