const exp = require("express");
const cors = require("cors");
const discordApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const nodemailer = require("nodemailer");
require("dotenv").config();

discordApp.use(exp.json());
discordApp.use(cors());

const sendRegistrationEmail = async (name, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
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
        name: "GDSC VNR VJIET",
        address: process.env.USER,
      },
      to: `${email}`,
      subject:
        "Welcome to GDGC VNRVJIET - Complete Your Community Registration",
      html: `<div style="max-width:800px;margin:0 auto;">
  <img src="cid:gdg_banner" alt="" style="max-height:250px;max-width:100%;display:block;margin:auto;">
  <h3>Welcome to GDGC VNRVJIET Community, ${name}!</h3>
  <p>Thank you for registering with us. To complete your registration and join our community, please verify your email address by entering the OTP below:</p>
  <h2><strong>OTP: ${otp}</strong></h2>
  <p>Steps to verify your registration:</p>
  <ul>
    <li>1. Copy the OTP above.</li>
    <li>2. Join our Discord server by clicking the link: <a href="https://discord.gg/fuxEPkXX" style="text-decoration:none;color:#1a73e8;">Join GDGC VNRVJIET Discord</a></li>
    <li>3. In the <strong>bot-commands</strong> channel, use the command <strong>/email {otp}</strong> to verify your registration.</li>
  </ul>
  <p>Once verified, you will have access to all our community resources and be able to start collaborating on exciting tech projects!</p>
  <p>If you face any issues or need assistance, feel free to reach out to us.</p>
  <br>
  <div>
    <span>Best regards,</span>
    <hr width="400px" style="margin: 5px 0px;border:none;background-color: rgb(88, 140, 236); height: 1px;">
    <img src="cid:gdg_footer" width="160px"alt="" style="float: left;">
    <div style="font-family: sans-serif;margin-right: 5px;margin-bottom: -10px;">
      <p style="margin-bottom: 9px;">Google Developer Groups</p>
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
</div>
`,
      attachments: [
        {
          filename: "gdgbanner.png",
          path: __dirname + "/../images/gdgbanner.png",
          cid: "gdg_banner",
        },
        {
          filename: "gdgfooter.png",
          path: __dirname + "/../images/gdgfooter.png",
          cid: "gdg_footer",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

discordApp.get(
  "/users",
  expressAsyncHandler(async (request, response) => {
    const { email, secretKey } = request.query;
    if (secretKey === "FBKNa5P4uqvRPULB") {
      let communityCollectionObject = await getDBObj(
        "communityCollectionObject"
      );
      let communityMember = await communityCollectionObject.findOne({ email });
      if (communityMember) {
        response
          .status(200)
          .send({ message: "User details", payload: communityMember });
      } else {
        response.status(404).send({ message: "User not found" });
      }
    } else {
      response.status(403).send({ message: "Invalid access" });
    }
  })
);

discordApp.post(
  "/register",
  expressAsyncHandler(async (request, response) => {
    const communityCollectionObject = await getDBObj(
      "communityCollectionObject"
    );

    let newRegister = request.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@vnrvjiet\.in$/;
    if (!emailRegex.test(newRegister.email)) {
      return response
        .status(400)
        .send({ message: "Email must end with @vnrvjiet.in" });
    }
    newRegister.rollNumber = newRegister.rollNumber.toUpperCase();
    const otp = Math.floor(100000 + Math.random() * 900000);
    newRegister.otp = otp;
    try {
      await communityCollectionObject.insertOne(newRegister);
      await sendRegistrationEmail(newRegister.name, newRegister.email, otp);
      response.send({ message: "Registration successful" });
    } catch (error) {
      console.error("Error during registration:", error);
      response.status(500).send({ message: "Registration failed" });
    }
  })
);

discordApp.post(
  "/check-register",
  expressAsyncHandler(async (request, response) => {
    let communityCollectionObject = await getDBObj("communityCollectionObject");
    let { rollNumber } = request.body;
    let userData = await communityCollectionObject
      .find({ rollNumber: rollNumber })
      .toArray();
    if (userData.length !== 0) {
      response.send({ status: false });
    }
    response.send({ status: true });
  })
);

module.exports = discordApp;
