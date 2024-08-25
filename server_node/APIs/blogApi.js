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
    console.log("hello")
    let blogCollection = await getDBObj("blogCollectionObject");
    try {
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
      console.log("Route hit");
      const blogId = req.params.id;
      const updatedBlog = req.body;

      console.log("Received updated blog data:", updatedBlog);

      let blogCollection = await getDBObj("blogCollectionObject");
      const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

      if (!existingBlog) {
          console.log('Blog not found');
          return res.status(404).send('Blog not found');
      }

      const blogToUpdate = {
          ...updatedBlog,
      };
      console.log("Blog to update:", blogToUpdate);

      const result = await blogCollection.updateOne(
          { _id: new ObjectId(blogId) },
          { $set: blogToUpdate }
      );

      if (result.modifiedCount === 0) {
          console.log('Blog not found or no changes made');
          return res.status(404).send('Blog not found or no changes made');
      }

      res.send({ message: 'Blog updated successfully' });
  } catch (error) {
    console.log("hello");
      console.error('Error in update route:', error);
      next(error);  // Pass the error to the middleware
  }
}));

blogApp.get("/getAccessdata/:emailId", expressAsyncHandler( async (req, res) => {
  try {
    let blogAccessCollection = await getDBObj("blogAccessCollectionObject");
    const emailId = req.params.emailId;
    const result = await blogAccessCollection.findOne({ email: emailId });
    if (!result) {
      return res.status(404).json({ success: false, message: "Data not found" });
    }
    console.log(result)
    res.json({ success: true, payload: result });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}));

blogApp.put("/change/:id", expressAsyncHandler(async (req, res) => {
    try {
      let blogCollection = await getDBObj("blogCollectionObject");
      const blogId = req.params.id;
      const result = await blogCollection.updateOne(
        { _id: new ObjectId(blogId) },
        { $set: { show: "true" } }
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