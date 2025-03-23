const exp = require("express");
const registrationApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const { Parser } = require("json2csv");
const verifyAdmin = require("../Middlewares/VerifyAdmin");

require("dotenv").config();

registrationApp.use(exp.json());

// manually inserting for the 

registrationApp.put('/register',expressAsyncHandler(async(req,res)=>{
    let scannercollection = await getDBObj("scannerCollection");
    const newRegister = req.body;
    // const dbuser = await scannercollection.findOne({razorpay_order_id:newRegister.order_id});
    const dbuser = await scannercollection.findOne({rollno:newRegister.rollno});
    if(dbuser!==null)
        {
            if(dbuser.entered===false){
                res.send({message:"Allow To Workshop" , payload : dbuser})
                // await scannercollection.updateOne({razorpay_order_id:newRegister.order_id},{$set:{entered:true}});
                await scannercollection.updateOne({rollno:newRegister.rollno},{$set:{entered:true}});
            }
            else
            res.send({message:"Already Scanned Dont Allow to Workshop" , payload:dbuser})
        }
    else{
        console.log(newRegister);
        res.send({message:"Not registered for Workshop"});
    }
}
))

// registrationApp.post('/register',expressAsyncHandler(async(req,res)=>{
    
// }))

registrationApp.get(
    "/export-event-csv/:eventName",
    expressAsyncHandler(async (request, response) => {
      let eventCollectionObject = await getDBObj("scannerCollection");
      let eventName = request.params.eventName;
  
      let eventData = await eventCollectionObject.find({
         event: eventName,
        // paymentSuccess: true,

        }).toArray();
  
      if (eventData.length === 0) {
        return response.status(404).send({ message: "No data found for this event" });
      }
  
      const csvData = eventData.map(e => ({
        Name: e.name,
        RollNo: e.rollno,
        Year: e.year,
        Branch: e.branch,
        // Section:e.section,
        WhatsApp: e.whatsapp,
        Email: e.email,
        Entered: e.entered,
        MailSent:e.mailSent,
        // PaymentSuccess:e.paymentSuccess,
        // Interest:e.interest,
      }));
  
      // const csvFields = ["Name", "RollNo","Year","Branch","Section" ,"WhatsApp", "Email", "Entered","MailSent","PaymentSuccess"];
      const csvFields = ["Name", "RollNo","Year","Branch" ,"WhatsApp", "Email", "Entered","MailSent"];
      const json2csvParser = new Parser({ csvFields });
      const csv = json2csvParser.parse(csvData);

      response.setHeader("Content-Type", "text/csv");
      response.setHeader("Content-Disposition", `attachment; filename=${eventName}.csv`);
      response.status(200).end(csv);
    })
  );

  registrationApp.get(
    "/event-registrations/:eventName",verifyAdmin,
    expressAsyncHandler(async (request, response) => {
      let eventCollectionObject = await getDBObj("scannerCollection");
      let eventName = request.params.eventName;
      let eventData = await eventCollectionObject.find({ 
        event: eventName,
        // paymentSuccess: true,
      }).toArray();
      if (eventData.length === 0) {
        return response.status(404).send({ message: "No data found for this event" });
      }
      response.send({ message: "Event registrations", payload: eventData });
    })
  );

registrationApp.post(
    "/check-register",
    expressAsyncHandler(async (request, response) => {
      let scannerCollectionObject = await getDBObj("scannerCollection");
      let {rollno} = request.body;
      let {event} = request.body;
      // based on the roll no find all the users in scanner collection and check paymentSuccessfull for false
      let eventData = await scannerCollectionObject
        .find({ rollno: rollno,event:event, paymentSuccess: true })
        .toArray();
      if (eventData.length !== 0) {
        response.send({status:false})
      }
      response.send({ status: true });
    })
  );

  registrationApp.get(
    "/count-successful-registrations/:eventName",
    expressAsyncHandler(async (request, response) => {
      try {
        let scannerCollectionObject = await getDBObj("scannerCollection");
        let eventname = request.params.eventName;

        let count = await scannerCollectionObject.find({
            event: eventname,
            paymentSuccess: true,
        }).toArray();
        response.send({ message: "Successful", cnt:160-count.length });
      } catch (error) {
        response.send({ message: "Error" });
      }
        
    })
);


module.exports=registrationApp;