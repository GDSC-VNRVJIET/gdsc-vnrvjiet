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

const sendEmail = async (email, orderId, paymentId, rollno) => {
  const qrCode = await QRCode.toDataURL(rollno);
  console.log("Hello")
  const qrCodeImage = new Buffer.from(qrCode.split("base64,")[1], "base64");
  try {
    const mailOptions = {
      from: {
        name: "GDSC VNRVJIET",
        address: process.env.USER,
      },
      to: `${email}`,
      subject: "You're Registered! Welcome to the Event by GDGC VNRVJIET",
      attachDataUrls: true,
      html: `
        <h1>Welcome to the GDGC VNRVJIET Event!</h1>
        <img src="${qrCode}" alt="QR Code" />
        <p>Thank you for registering for our upcoming event at GDSC VNRVJIET. We're thrilled to have you join us.</p>
        <p>Your registration details are as follows:</p>
        <ul>
          <li><strong>Order ID:</strong> ${orderId}</li>
          <li><strong>Payment ID:</strong> ${paymentId}</li>
        </ul>
        <p>You can use the QR code above for a smooth check-in process at the event.</p>
        <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
        <br>
        <p>Best regards,</p>
    <p>Google Developer Student Clubs<br>
    VNR Vignana Jyothi Institute of Engineering & Technology</p>
      `,
    };
    await transporter.sendMail(mailOptions);
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
    const options = req.body;
    // const email = req.body.email;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(400).send("Bad Request");
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

mailApp.post("/validate", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    email,
    rollno,
  } = req.body;
  try {
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: " Transaction is not legit!" });
  }
  await sendEmail(email, razorpay_order_id, razorpay_payment_id, rollno);
  res.json({
    msg: " Transaction is legit!",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
  } catch (error) {
    console.error("Error processing transaction or sending email:", err.message);
    return res.status(500).json({ msg: "Internal server error" });
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

module.exports = mailApp;
