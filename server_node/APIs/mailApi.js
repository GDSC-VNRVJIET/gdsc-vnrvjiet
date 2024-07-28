const exp = require("express");
const mailApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();

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

const sendEmail = async (email, orderId, paymentId , rollno) => {
    const qrCode = await QRCode.toDataURL(rollno);
    qrCodeImage=new Buffer.from(qrCode.split("base64,")[1], "base64")
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

  const sendContactEmail = async (name, email, message) => {
    const content = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      .header {
        text-align: center;
        padding: 10px;
        background-color: #f2f2f2;
      }
      .content {
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      .logo {
        height: 50px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="https://upload.wikimedia.org/wikipedia/en/4/47/VNRVJIETLogo.png" class="logo" alt="VNR Logo">
      <img src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png" class="logo" alt="GDSC Logo">
    </div>
    <div class="content">
      <p>You have received a new message from the contact form. Here are the details:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
    </div>
    <div class="footer">
      <p>&copy; 2024 VNR & GDSC. All rights reserved.</p>
    </div>
  </body>
  </html>
  `;
  
    const mail = {
      from: name,
      to: "gdsc.vnrvjiet@gmail.com", // GDSC email
      subject: "New Message from Contact Form",
      html: content,
    };
  
    await transporter.sendMail(mail);
  
    await transporter.sendMail({
      from: "<your email address>",
      to: email,
      subject: "Submission was successful",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      .header, .footer {
        text-align: center;
        padding: 10px;
        background-color: #f2f2f2;
      }
      .content {
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      .logo {
        height: 50px;
      }
      .footer-logo {
        height: 30px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="https://upload.wikimedia.org/wikipedia/en/4/47/VNRVJIETLogo.png" class="logo" alt="VNR Logo">
      <img src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png" class="logo" alt="GDSC Logo">
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for getting in touch with us. We have received your submission successfully. Below are the details of your submission:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <p>We appreciate your interest and will get back to you shortly.</p>
      <p>Best regards,<br>The VNR & GDSC Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 VNR & GDSC. All rights reserved.</p>
    </div>
  </body>
  </html>
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
  
    const sha = crypto.createHmac("sha256", "q8KEghPtcWSoLFVyz586NDRz");
  
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

module.exports = mailApp;