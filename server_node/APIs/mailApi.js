const exp = require("express");
const mailApp = exp.Router();
const getDBObj = require("./DBConnection");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const { getUserByMail, resetPw } = require("./userApi");

mailApp.use(exp.json());

const Razorpay = require("razorpay")
const crypto = require("crypto")
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const cors = require("cors");
const creds = require("../config");


mailApp.use(exp.urlencoded({ extended:false }));
mailApp.use(bodyParser.json({ limit: '10mb', extended: true }))
mailApp.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
  user: process.env.USER,
  pass: process.env.PASS
}
})
transporter.verify((error, success) => {
if (error) {
  console.log(error);
} else {
  console.log('Server is ready to take messages');
}
});

const sendEmail = async (email, orderId, paymentId , rollno) => {
    const qrCode = await QRCode.toDataURL(rollno);
    qrCodeImage=new Buffer.from(qrCode.split("base64,")[1], "base64")
    try {
        const mailOptions = {
            from: {
                name: "GDSC WORKSHOP REGISTERED",
                address: process.env.USER
            },
            to: `${email}`,
            subject: "Order Confirmation",
            attachDataUrls:true,
            html: `
                <h1>Order Confirmation</h1>
                <img src="${qrCode}" alt="QR Code" />
                <p>Order ID: ${orderId}</p>
                <p>Payment ID: ${paymentId}</p>
                <p>Thank you for your order!</p>
                <p>Best regards</p>
            `
        }
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (err) {
        console.error('Error sending email:', err);
    }
  }
  
function sendGiveAccessEmail(email) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS,
            },
        });
        const mailOptions = {
            from: {
                name: "ACCESS GRANTED",
                address: process.env.USER
            },
            to: `${email}`,
            subject: "Access Granted",
            html: `
                <h1>Access Granted</h1>
                <p>Now you can add blogs in our website</p>
                <p>Best regards</p>
            ` 
        } 
        transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } 
    catch (err) {
        console.error('Error sending email:', err);
    }
}



  const sendContactEmail = async (name, email, message) => {
  
    const mail = {
      from: name,
      to: process.env.USER, 
      subject: "New Message from Contact Form",
      html:`
        <p>Dear Team,</p>
        <p>We have received a new message via the "Contact Us" form on our website. Please find the details below:</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/> ${message}</p>
        <br/>
        <p>Please review the message and respond accordingly.</p>
        <p><b>Note:</b> If the message requires urgent attention, please prioritize.</p>
        ---
        <b><p>Thanks & Regards,</p>
        <p>GDSC VNRVJIET</p></b>
      `,
    };
  
    await transporter.sendMail(mail);
  
    await transporter.sendMail({
      from: "<your email address>",
      to: email,
      subject: "Thank You for Contacting Us!",
      html:`
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to us through our "Contact Us" form. We have received your message and will get back to you as soon as possible. Below are the details of your submission:</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/> ${message}</p>
        <br/>
        <p>Our team is currently reviewing your inquiry and will respond to you within 3 days. If your message is urgent, please feel free to contact us directly at gdsc.vnrvjiet@gmail.com</p>
        <b><p>Thanks & Regards,</p>
        <p>GDSC VNRVJIET</p></b>
      `,
    });
  };

  
  mailApp.post("/order", async(req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        })
        if(!req.body) {
            return res.status(400).send("Bad Request");
        }
        const options = req.body;
        // const email = req.body.email;
        console.log(options);
        const order = await razorpay.orders.create(options);
        if(!order) {
            return res.status(400).send("Bad Request");
        }
        res.json(order);
    }
    catch (err){
        console.log(err);
        res.status(500).send(err)
    }
  })
  
  mailApp.post("/validate", async (req, res) => {
  
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature, email , rollno} = req.body
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  
    const digest = sha.digest("hex");
  
    if (digest!== razorpay_signature) {
        return res.status(400).json({msg: " Transaction is not legit!"});
    }
    await sendEmail(email, razorpay_order_id, razorpay_payment_id , rollno);
    res.json({msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
  })

  mailApp.post("/contactus", expressAsyncHandler(async (req, res) => {
    //console.log("worked");
    const { firstName, lastName, email, msg } = req.body;
    const name = `${firstName} ${lastName}`;
    await sendContactEmail(name, email, msg);
    res.json({ status: "success" });
  }));
  mailApp.use(cors())

// code for to send a mail
mailApp.post("/give-access-mail", expressAsyncHandler(async (req, res) => {
  const { mail } = req.body;

  try {
      // Log the incoming email for reference
      console.log("Processing access grant for:", mail);

      // Send the access email
      sendGiveAccessEmail(mail);

      // Get the user collection object from the database
      let userCollectionObject = await getDBObj("userCollectionObject");

      // Perform the update operation and await its result
      const updateResult = await userCollectionObject.updateOne(
          { email: mail },
          { $set: { access: true } }
      );

      // Log the MongoDB update result
      console.log("MongoDB Update Result:", updateResult);

      // Check if the update was successful
      if (updateResult.matchedCount === 0) {
          console.error("No user found with the provided email.");
          res.json({ status: "Error", message: "No user found with the provided email." });
      } else {
          res.json({ status: "success" });
      }
  } catch (error) {
      console.error("Error during access grant:", error.message);
      res.json({ status: "Error", message: error.message });
  }
}));


module.exports = mailApp;