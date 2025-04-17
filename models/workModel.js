const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    mobile:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    event:{
        type: mongoose.Schema.Types.ObjectId, ref: 'events' 
    },
})

const works = new mongoose.model("works",workSchema)