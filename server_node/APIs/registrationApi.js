const exp = require("express");
const registrationApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

registrationApp.use(exp.json());

registrationApp.put('/register',expressAsyncHandler(async(req,res)=>{
    let scannercollection = await getDBObj("scannerCollection");
    const newRegister = req.body;
    const dbuser = await scannercollection.findOne({rollno:newRegister.rollno});
    if(dbuser!==null)
        {
            if(dbuser.entered===false){
                res.send({message:"Allow To Workshop" , payload : dbuser})
                await scannercollection.updateOne({rollno:newRegister.rollno},{$set:{entered:true}});
            }
            else
            res.send({message:"Already Scanned Dont Allow to enter" , payload:dbuser})
        }
    else{
        console.log(newRegister);
        res.send({message:"Not registered for Workshop"});
    }
}
))

registrationApp.post('/register',expressAsyncHandler(async(req,res)=>{
    let scannercollection = await getDBObj("scannerCollection");
    const newRegister = req.body;
    newRegister.entered = false;
    await scannercollection.insertOne(newRegister);
    res.send({message : "Successfully Registered"})
}))

module.exports=registrationApp;