const exp = require("express");
const cors = require("cors")
const blogApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const { ObjectId } = require('mongodb');

require("dotenv").config();

blogApp.use(exp.json());
// blogApp.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow 'Authorization' header
//   credentials: true, // Allow credentials
// }));
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
    res.send({ message: "Blogs", payload: blogs });
}))

blogApp.get('/getblog/:id', async (req, res) => {
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
});

blogApp.put('/updateblog/:id', async (req, res, next) => {
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
          createdBy: existingBlog.createdBy,
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
});



// blogApp.put('/updateblog/:id', async (req, res) => {
//   console.log("Received request to update blog"); // Log the incoming request
//   try {
//       const blogId = req.params.id;
//       const updatedBlog = req.body;

//       let blogCollection = await getDBObj("blogCollectionObject");

//       const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

//       if (!existingBlog) {
//           return res.status(404).send('Blog not found');
//       }

//       const blogToUpdate = {
//           ...updatedBlog,
//           createdBy: existingBlog.createdBy,
//       };

//       const result = await blogCollection.updateOne(
//           { _id: new ObjectId(blogId) },
//           { $set: blogToUpdate }
//       );

//       if (result.modifiedCount === 0) {
//           return res.status(404).send('Blog not found or no changes made');
//       }

//       res.send('Blog updated successfully');
//   } catch (error) {
//       console.error('Error updating blog:', error); // Log any errors
//       res.status(500).send('Error updating blog');
//   }
// });

  

module.exports = blogApp;