const jwt = require('jsonwebtoken')

const eventMiddleware= (req,res,next)=>{
    console.log("inside eventMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token!=""){
        try {
            const jwtResponse = jwt.verify(token,process.env.EJWTPASS)
            console.log(jwtResponse);
            req.eventId = jwtResponse.eventId
            console.log(req.eventId);
            
        } catch (e) {
            res.status(401).json("Authorisation failed ... please add event")
            console.log(e);
        }
    }else{
        res.status(404).json("Authorisation Failed . Tocken is missing..!!!")
    }
    
    next()
    
    
}

module.exports = eventMiddleware