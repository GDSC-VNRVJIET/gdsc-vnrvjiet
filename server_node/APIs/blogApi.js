const exp = require("express");
const cors = require("cors")
const blogApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const { ObjectId } = require('mongodb');

require("dotenv").config();

blogApp.use(exp.json());
blogApp.use(cors());


blogApp.post('/add',expressAsyncHandler(async(req,res)=>{
    let blog = req.body;
    let blogCollection = await getDBObj("blogCollectionObject");
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const day = currentDate.getDate();
      const dateString = `${month} ${day}, ${year}`;
      blog.date = dateString;
        const result =  await blogCollection.insertOne(blog);
   res.json({ status: "Sent successfully" });
    } catch (error) {
        res.json({ status: "Not sent" });
    }
   
}))

blogApp.get('/gettrueblogs',expressAsyncHandler(async(req,res)=>{
    let blogCollection = await getDBObj("blogCollectionObject");
     const blogs = await blogCollection.find({ show: "true" }).toArray();
     res.json({ message: "Blogs", payload: blogs });
}))
blogApp.get('/getfalseblogs',expressAsyncHandler(async(req,res)=>{
    let blogCollection = await getDBObj("blogCollectionObject");
     const blogs = await blogCollection.find({ show: "false" }).toArray();
     res.json({ message: "Blogs", payload: blogs });
}))

blogApp.get('/getblog/:id', expressAsyncHandler( async (req, res) => {
    try {
        let blogCollection = await getDBObj("blogCollectionObject");
        const blogId = req.params.id;

        // Convert blogId to ObjectId
        const objectId = new ObjectId(blogId);

        const blog = await blogCollection.findOne({ _id: objectId });
        
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.json({ success: true, payload: blog });
    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}));

blogApp.put('/updateblog/:id', expressAsyncHandler( async (req, res, next) => {
  try {
      const blogId = req.params.id;
      const updatedBlog = req.body;


      let blogCollection = await getDBObj("blogCollectionObject");
      const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

      if (!existingBlog) {
          return res.status(404).send('Blog not found');
      }

      const blogToUpdate = {
          ...updatedBlog,
      };

      const result = await blogCollection.updateOne(
          { _id: new ObjectId(blogId) },
          { $set: blogToUpdate }
      );

      if (result.modifiedCount === 0) {
          return res.status(404).send('Blog not found or no changes made');
      }

      res.send({ message: 'Blog updated successfully' });
  } catch (error) {
      console.error('Error in update route:', error);
      next(error);  // Pass the error to the middleware
  }
}));

blogApp.post("/getAccessdata", expressAsyncHandler( async (req, res) => {
  try {
    const {blogId,emailId} = req.body;
    let blogAccessCollection = await getDBObj("blogAccessCollectionObject");
    // in the database check the blogId , if that blogId axists , check its corresponding emailId
    const result = await blogAccessCollection.findOne({ blogId: blogId});
    if(result){
      if(result.email===emailId){
        return res.status(200).json({ success: true, message: "Access granted" });
      }else{
        return res.status(200).json({ success: false, message: "Access denied" });
      }
    }
  } catch (error) {
    console.error("Error checking blog access:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}));

blogApp.put("/change/:id", expressAsyncHandler(async (req, res) => {
    try {
      let blogCollection = await getDBObj("blogCollectionObject");
      const blogId = req.params.id;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const day = currentDate.getDate();
      const dateString = `${month} ${day}, ${year}`;
      const result = await blogCollection.updateOne(
        { _id: new ObjectId(blogId) },
        { $set: { show: "true", date: dateString } }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      res.json({ success: true, message: "Blog updated successfully" });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }));

// api for deleting a particular blog using its MongoId
blogApp.delete("/delete/:id", expressAsyncHandler(async (req, res) => {
  try {
    let blogCollection = await getDBObj("blogCollectionObject");
    const blogId = req.params.id;
    const result = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}))  
module.exports = blogApp;