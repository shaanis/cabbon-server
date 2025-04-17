const boys = require('../models/boysModel')
const participants = require('../models/parcipateModel')
const events = require('../models/eventModel');
const jwt = require('jsonwebtoken')

// add boys
exports.addBoysController = async (req, res) => {
    console.log("inside addBoysController");
    const userId = req.userId;
    const imgUrl = req.file?.path;
    const { name, email, mobile, place, grade, wage, password } = req.body;

    try {
        const existingUser = await boys.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newBoys = new boys({
            name,
            email,
            mobile,
            place,
            grade,
            wage,
            userId,
            imgUrl,
            password // this will default to last 6 digits of mobile if not provided
        });

        await newBoys.save();
        res.status(200).json(newBoys);
    } catch (e) {
        res.status(500).json({ message: "Something went wrong", error: e.message });
    }
};


// boys login
exports.boysLoginController=async(req,res)=>{
    console.log("inside boysLoginController");
    const {email,password}=req.body
    try {
        const boyLogin = await boys.findOne({email,password})
        if(boyLogin){
            const token = jwt.sign({userId:boyLogin._id},process.env.JWTPASSWORD)
            res.status(200).json({user:boyLogin,token})

        }
    } catch (e) {
        res.status(401).json(e)
    }
    
}

// scan
exports.scanAndAddBoysController = async (req, res) => {
    const { id,mongoEventId } = req.body;
    const eventId = req.eventId;

    try {
        const boy = await boys.findById(id);
        const existing = await participants.findOne({ boyId: id, eventId });

        if (existing) {
            return res.status(401).json("already scanned");
        }

        const event = await events.findById(eventId);
        const now = new Date();
        const fineTime = new Date(`${now.toDateString()} ${event.finetime}`);
        const fine = now > fineTime ? 50 : 0;

        const newScan = new participants({
            boyId: id,
            boyName: boy.name,
            email: boy.email,
            mobile: boy.mobile,
            eventId,
            entry: now,
            fine,
            mongoEventId
        });

        await newScan.save();
        res.status(200).json(newScan);
    } catch (e) {
        res.status(500).json({ error: "Something went wrong", details: e });
    }
};

// fetch worker boys

exports.scannedBoysController=async(req,res)=>{
    console.log("insie scannedBoysController");
    const eventId = req.eventId
    try {
         const scanBoys= await participants.find({eventId,status:"entered"})
         res.status(200).json(scanBoys)
    } catch (e) {
        res.status(401).json(e)

    }
    
}

// get all boys added by that person
exports.getAllBoysController=async(req,res)=>{
    console.log("inside getAllBoysController");
    const userId = req.userId
    try {
       const getBoys = await boys.find({userId}).populate('userId')
       res.status(200).json(getBoys)
    } catch (e) {
        res.status(401).json(e)
    }
    
}

// scan and exist from work or work finished
exports.scanAndExistController=async(req,res)=>{
    console.log("inside scanAndExistController");
    
  const eventId = req.eventId
  const{boyId}=req.body
  try {
    const existBoy = await participants.findOneAndUpdate(
        { boyId,  eventId }, // filter by both id and eventId
        {
          exit: new Date(),
          status: "exited"
        },
        { new: true }
      );
      res.status(200).json(existBoy)

  } catch (e) {
    res.status(401).json(e)
  }
}
