const mongoose = require('mongoose')

const boysSchema = new mongoose.Schema({
    name:{
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
    place:{
        required:true,
        type:String
    },
    grade:{
        required:true,
        type:String
    },
    wage:{
        required:true,
        type:String
    },
    imgUrl:{
        required:true,
        type:String
    },
    password:{
        // required:true,
        type:String
    },
    userId:{
        // type: mongoose.Schema.Types.ObjectId, ref: "users"
        required:true,
        type:String
    },
})

boysSchema.pre('save', function(next) {
    if (!this.password && this.mobile) {
        this.password = this.mobile.slice(-6);
    }
    next();
});


const boys = mongoose.model("boys",boysSchema)
module.exports = boys