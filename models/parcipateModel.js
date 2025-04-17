const mongoose = require('mongoose')

const paricipateSchema= new mongoose.Schema({
    mongoEventId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'events' 
    },
    boyName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    mobile:{
        required:true,
        type:String
    },
    eventId:{
        required:true,
        type:String
    },
    boyId:{
        required:true,
        type:String
    },
    status:{
        required:true,
        type:String,
        default:'entered'
    },
    entry:{
        required:true,
        type:Date,
        default:Date.now
    },
    exit:{
        // required:true,
        type:Date,
        default:null
    },
    fine: {
        type: Number,
        default: 0
    }
    // careOff:{
    //     required:true,
    //     type:String
    // },
})
const participants = mongoose.model("participants",paricipateSchema)
module.exports = participants