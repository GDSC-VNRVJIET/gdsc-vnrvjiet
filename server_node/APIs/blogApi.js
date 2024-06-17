const exp = require("express");
const blogApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

blogApp.use(exp.json());



blogApp.post('/add',expressAsyncHandler(async(req,res)=>{
    let blog = req.body;
    console.log("hello")
    let blogCollection = await getDBObj("blogCollectionObject");
   const result =  await blogCollection.insertOne(blog);
   res.json({ status: "Sent successfully" });
}))

blogApp.get('/getblogs',expressAsyncHandler(async(req,res)=>{
    let blogCollection = await getDBObj("blogCollectionObject");
    let blogs = await  blogCollection.find().toArray();
    res.send({ message: "Blogs", payload: blogs });
}))

module.exports = blogApp;