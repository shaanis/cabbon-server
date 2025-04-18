const events = require('../models/eventModel')
const boys = require('../models/boysModel')
const jwt = require('jsonwebtoken')
const participants = require('../models/parcipateModel')

exports.addEventsController=async(req,res)=>{
    console.log("inside addEVentsController");
    const {name,time,finetime,place,userId}= req.body 
    const userToken = req.userId
    try {
            const newEvent = new events({
                name,time,finetime,place,userId,userToken
            })
            await newEvent.save()
            const token = jwt.sign({eventId:newEvent._id},process.env.exports.addEventsController=async(req,res)=>{
    console.log("inside addEVentsController");
    const {name,time,finetime,place,userId}= req.body 
    const userToken = req.userId
    try {
            const newEvent = new events({
                name,time,finetime,place,userId,userToken
            })
            await newEvent.save()
            const token = jwt.sign({eventId:newEvent._id},process.env.JWTPASSWORD)
            res.status(200).json({event:newEvent,token})
            return
    } catch (e) {
        res.status(401).json(e)
    }
     
})
            res.status(200).json({event:newEvent,token})
            return
    } catch (e) {
        res.status(401).json(e)
    }
     
}


exports.updateStatusController=async(req,res)=>{
    console.log("inside updateStatusController");
    const{id}=req.params
    const{status}=req.query
    try {
         const result  = await events.findByIdAndUpdate({_id:id},{status},{new:true})
         res.status(200).json( result);
    } catch (e) {
        console.error(e);
        res.status(500).json("Server error");
    }
    
}

// get events
exports.getEventsController=async(req,res)=>{   
    console.log("inside getEventsController");
    const userId= req.userId
    try{
       const result = await events.find({userId, status: { $in: ['ongoing', 'pending'] } });
        res.status(200).json(result)
    }catch(e){
        console.log(e);
        res.status(401).json(e)
        
    }
    
}

// find individual or details of event
exports.getEventsByIdController=async(req,res)=>{
    console.log("inside getEventsByIdController");
    
    const{id}=req.params
    try {
        const event = await events.findById(id)
        res.status(200).json(event)
    } catch (e) {
      res.status(401).json(e)  
    }
}

//get user individual works
exports.individualServiceController=async(req,res)=>{
    console.log("inside individualServiceController");
    const{boyId}=req.params
    try {
        const allEvents = await events.find({boyId}).populate('eventId')
        res.status(200).json(allEvents)
    } catch (e) {
      res.status(401).json(e)  
    }
    
}

//get users all individual services
exports.boysEventsController=async(req,res)=>{
    console.log("inside boysEventsController");
    const{boyId}=req.body
    try {
        const result = await participants.find({boyId}).populate('mongoEventId')
        res.status(200).json(result)
    } catch (e) {
       res.status(401).json(e) 
    }
    
}

// current running event of users
exports.currentEventConttroller=async(req,res)=>{
    console.log("inside currentEventConttroller");
    const {boyId}=req.body
    try {
        const result = await participants.findOne({boyId,status:'entered'}).populate('mongoEventId')
        if(result){
            res.status(200).json(result)
        }
        
    } catch (e) {
        
    }
    
}