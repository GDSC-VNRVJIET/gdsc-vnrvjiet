const exp = require("express");
const mailApp = exp.Router();
const getDBObj = require("./DBConnection");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
const { getUserByMail, resetPw } = require("./userApi");

mailApp.use(exp.json());

const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");
const cors = require("cors");
const creds = require("../config");

mailApp.use(exp.urlencoded({ extended: false }));
mailApp.use(bodyParser.json({ limit: "10mb", extended: true }));
mailApp.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure:false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
});

const sendEmail = async (order_id,email, rollno , whatsapp, branch, name, event, section) => {
  const qrCode = await QRCode.toDataURL(order_id);
  const qrCodeImage = new Buffer.from(qrCode.split("base64,")[1], "base64");
  try {
    const mailOptions = {
      from: {
        name: "GDGC VNRVJIET",
        address: process.env.USER,
      },
      to: `${email}`,
      subject: `You're Registered! Welcome to the ${event} Event by GDGC VNRVJIET`,
      attachDataUrls: true,
      html: `
      <div style="max-width:800px;margin:0 auto;">
        <img src="cid:gdg_banner" alt="" style="max-height:250px;max-width:100%;display:block;margin:auto;">
        <h3>Welcome to the GDGC VNRVJIET's ${event} Event, ${name}!</h3>
        <img src="${qrCode}" alt="QR Code" style="width:30%;" />
        <p>Thank you for registering for our upcoming event at GDGC VNRVJIET. We're thrilled to have you join us.</p>
        <p>Your registration details are as follows:</p>
        <ul>
          <li><strong>Name:</strong>${name}</li>
          <li><strong>Branch:</strong>${branch}</li>
          <li><strong>Section:</strong> ${section}</li>
        </ul>
        <p>You can use the QR code above for a smooth check-in process at the event.</p>
        <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
        <br>
        <p>Best regards,</p>
    <p>Google Developer Groups on Campus<br>
    VNR Vignana Jyothi Institute of Engineering & Technology</p>
    <div>
        <span>Best regards,</span>
        <hr width="400px" style="margin: 5px 0px;border:none;background-color: rgb(88, 140, 236); height: 1px;">
        <img src="cid:gdg_footer" width="160px"alt="" style="float: left;">
        <div style="font-family: sans-serif;margin-right: 5px;margin-bottom: -10px;">
            <p style="margin-bottom: 9px;">Google developer Groups</p>
            <p style="margin-top: 5px;">On Campus <span style="color: darkslategray;">• VNRVJIET</span></p>
        </div>
        <div style="margin-top: 2px;">
            <span>
                <a href="https://www.linkedin.com/company/gdsc-vnrvjiet/" style="text-decoration: none;">
                    <img src="https://lh6.googleusercontent.com/cC1MSbCakLeSsH9wlpfS5FfnKxHDTkPAp14j47AYFFUfYPpy7mxCukURTtmfBW5HyaLdcpn2ifOcsu5GCc1EuiigKeOJEI5oW7YcBpckpyNGSb5liSpnDbgKx0YS5Fdwf9VTTGLX8A" alt="">
                </a>
            </span>
            <span>
                <a href="https://www.instagram.com/gdsc.vnrvjiet/" style="text-decoration: none;">
                    <img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe2WMPt0OyEHetlhDT4rhbuqUG8S3JjEEjE07rAtxVgiXI9Yxe9vJ85-MwSTbJdl1B3K9w5T1ExRtN5yyTZfoDPXYIiy_gGkBLGBL6HQJhANlMJA_9NoTYJWOEdaHk_wi23mrSUcA1UD9mL1mlkhv3Yk985?key=2z68nRGqyxEDZLXmUTszTw" alt="">
                </a>
            </span>
        </div>
        </div>
      `,
      attachments: [
        {
          filename: 'gdgbanner.png',
          path: __dirname+'/../images/gdgbanner.png',
          cid: 'gdg_banner'
        },
        {
          filename: 'gdgfooter.png',
          path: __dirname+'/../images/gdgfooter.png',
          cid: 'gdg_footer'
        },
      ],
    };
    await transporter.sendMail(mailOptions).catch(err => {
      console.error('Email failed:', err);
    });
    console.log("Mail sent successfully",email);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};


function sendGiveAccessEmail(email, blogId) {
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
        name: "GDGC VNRVJIET",
        address: process.env.USER,
      },
      to: `${email}`,
      subject: "Invitation to Share Your Achievement on GDSC VNR VJIET Website",
      html: `
                <p>Hi,</p>
    <p>I hope this email finds you well.</p>
    <p>We are delighted to recognize your achievement, and as a part of our ongoing efforts to inspire and engage our community, we would love to feature your accomplishment on the GDSC VNR VJIET website.</p>
    <p>We believe that your story will be a valuable source of motivation for our peers and juniors.</p>
    <p>To contribute your blog, please click on the link below and use your email ID to access the submission portal:</p>
    <p><a href="https://gdsc-vnrvjiet.vercel.app/edit-blog/${blogId}" target="_blank">Submit Your Blog Post</a></p>
    <p>Once you have access, you can submit your blog post, including details about your achievement, any challenges you faced, and the impact it has had on your personal or professional growth.</p>
    <p>If you have any questions or need assistance during the submission process, please feel free to reach out to us.</p>
    <p>Thank you for considering this opportunity to share your journey with the GDSC community.</p>
    <br>
    <p>Best regards,</p>
    <p>Google Developer Student Clubs<br>
    VNR Vignana Jyothi Institute of Engineering & Technology</p>
            `,
    };
    transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

const sendContactEmail = async (name, email, message) => {
  const mail = {
    from: name,
    to: process.env.USER,
    subject: "New Message from Contact Form",
    html: `
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
    html: `
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

const sendNotifyAdminEmail = async (email, blogId) => {
  const mail = {
    from: process.env.USER,
    to: process.env.USER,
    subject: "New Blog Submission",
    html: `
        <p>We have received a new blog submission. Please find the details below to Post the blog:</p>
        <p>We got a new blog submission from ${email}</p>
        <br/>
        <p><a href="https://gdsc-vnrvjiet.vercel.app/blogs/${blogId}" target="_blank">Post the Blog Permenantly</a></p>
        <p><b>Note:</b> Check whether the data is postable or not</p>
        ---
        <b><p>Thanks & Regards,</p>
        <p>GDSC VNRVJIET</p></b>
      `,
  };

  await transporter.sendMail(mail);
};

const thankAuthor = async (email) => {
  const mail = {
    from: process.env.USER,
    to: email,
    subject: "Your Blog is Now Live!",
    html: `
        <p>Dear Author,</p>
        <p>We are excited to inform you that your blog has been successfully published and is now live on our platform. You can find your blog at the following link:</p>
        <p><a href="https://gdsc-vnrvjiet.vercel.app/blogs" target="_blank">https://gdsc-vnrvjiet.vercel.app/blogs</a></p>
        <br/>
        <p>Thank you for your time in contributing to the community! We look forward to more insightful content from you in the future.</p>
        ---
        <b><p>Best Regards,</p>
        <p>GDSC VNRVJIET</p></b>
      `,
  };

  return await transporter.sendMail(mail);
};

mailApp.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    if (!req.body) {
      return res.status(400).send("Bad Request");
    }
    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: req.body.receipt,
      payment_capture: 1,
    }
    // check the email should be one only
    const email = req.body.email.trim(); // Trim any leading/trailing whitespace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).send("Bad Request - Invalid Email Format");
}

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(400).send("Bad Request");
    }
    
    let scannercollection = await getDBObj("scannerCollection");
    const newRegister = {
      rollno: req.body.rollno,
      email: req.body.email,
      whatsapp: req.body.whatsapp,
      branch: req.body.branch,
      name: req.body.name,
      event: req.body.event,
      year: req.body.year,
      section: req.body.section,
      razorpay_order_id: order.id,
      mailSent: false,
      entered: false,
      paymentSuccess: false
    };
    console.log(newRegister);
    await scannercollection.insertOne(newRegister);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

mailApp.post(
  "/contactus",
  expressAsyncHandler(async (req, res) => {
    //console.log("worked");
    const { firstName, lastName, email, msg } = req.body;
    const name = `${firstName} ${lastName}`;
    await sendContactEmail(name, email, msg);
    res.json({ status: "success" });
  })
);
mailApp.use(cors());

// code for to send a mail
mailApp.post(
  "/give-access-mail",
  expressAsyncHandler(async (req, res) => {
    const { mail, blogId } = req.body;

    try {

      // Send the access email
      sendGiveAccessEmail(mail, blogId);

      // Get the user collection object from the database
      let blogAccessCollectionObject = await getDBObj(
        "blogAccessCollectionObject"
      );

      // Perform the update operation and await its result
      const response = await blogAccessCollectionObject.insertOne({
        email: mail,
        blogId: blogId,
      });

      // Check if the update was successful
      res.json({ status: "success" });
    } catch (error) {
      console.error("Error during access grant:", error.message);
      res.json({ status: "Error", message: error.message });
    }
  })
);

mailApp.post(
  "/notify-admin",
  expressAsyncHandler(async (req, res) => {
    const { email, blogId } = req.body;
    try {
      // Send the access email
      sendNotifyAdminEmail(email, blogId);
      res.json({ status: "success" });
    } catch (error) {
      console.error("Error during access grant:", error.message);
      res.json({ status: "Error", message: error.message });
    }
  })
);

mailApp.post(
  "/thank-author",
  expressAsyncHandler(async (req, res) => {
    const { blogId } = req.body;
    let blogAccessCollectionObject = await getDBObj(
      "blogAccessCollectionObject"
    );
    try {
      const response = await blogAccessCollectionObject.findOne({ blogId });
      if (response?.email) {
        await thankAuthor(response?.email);
        return res.json({ status: "success" });
      } else {
        return res.json({ status: "failure", message: "Email not found" });
      }
    } catch (error) {
      console.error("Error during thanking author:", error.message);
      return res.json({ status: "error", message: error.message });
    }
  })
);


const processedEventIds = new Set();

const checkDuplicateEvent = (req, res, next) => {
  const eventId = req.headers["x-razorpay-event-id"];

  if (processedEventIds.has(eventId)) {
    // Duplicate event, skip processing
    console.log(`Duplicate event with ID ${eventId}. Skipping processing.`);
    res.status(200).send();
  } else {
    // Not a duplicate, continue with the next middleware or route handler
    processedEventIds.add(eventId);
    next();
  }
};

mailApp.post(
  '/verification',
  checkDuplicateEvent,
  expressAsyncHandler(async (req, res) => {
    try {
      const signature = req.headers['x-razorpay-signature'];
      const crypto = require('crypto');
      const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      console.log('Digest:', digest);
      console.log('Razorpay Signature:', signature);
      // const isValid = await validateWebhookSignature(
      //   JSON.stringify(req.body),
      //   signature,
      //   process.env.RAZORPAY_WEBHOOK_SECRET
      // );
      const isValid = true;
      if (isValid) {
        const { payload } = req.body;
        console.log(payload)
        let scannerCollection = await getDBObj('scannerCollection');
        let dbuser = await scannerCollection.findOne({
          razorpay_order_id: payload.payment.entity.order_id,
        });

        if (dbuser !== null) {
          await scannerCollection.updateOne(
            { razorpay_order_id: payload.payment.entity.order_id },
            {
              $set: {
                paymentSuccess: true,
                razorpayResponse: req.body,
              },
            }
          );
          await sendEmail(
            payload.payment.entity.order_id,
            dbuser.email,
            dbuser.rollno,
            dbuser.whatsapp,
            dbuser.branch,
            dbuser.name,
            dbuser.event,
            dbuser.section
          );
          await scannerCollection.updateOne(
            { razorpay_order_id: payload.payment.entity.order_id },
            {
              $set: {
                mailSent: true
              },
            }
          );
          console.log('Payment and email process completed for:', dbuser.email);
        }
      }
      res.status(200).send();
    } catch (err) {
      console.error('Error processing webhook:', err);
      res.status(500).send('Internal Server Error');
    }
  })
);

module.exports = mailApp;
