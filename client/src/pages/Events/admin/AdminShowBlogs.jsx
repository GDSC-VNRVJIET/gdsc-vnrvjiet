import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminShowBlogs() {
  const [showModal, setShowModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [base64Image1, setBase64Image1] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [smalldesc, setSmalldesc] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/getblogs`
        );
        console.log("Fetched blogs:", response.data.payload);

        // Ensure response.data.payload is an array
        if (Array.isArray(response.data.payload)) {
          setBlogs(response.data.payload);
        } else {
          console.error("Unexpected response format: payload is not an array");
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  const handleTitleChange = (e) => setBlogTitle(e.target.value);

  const handleAddBlog = () => {
    console.log("Blog Title:", blogTitle);
    navigate("/add-blog", { state: [base64Image1, blogTitle, category] });
    setShowModal(false);
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image1(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 flex items-center justify-between">
            
            <div className="flex items-center ml-6">
                <div className="bg-white rounded-lg p-2 shadow-md flex items-center justify-center h-20">
                    <img src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png" alt="GDSC Logo" className="h-10 w-15" />
                </div>
                <div className="ml-4">
                    
                    <h1 className="text-xl font-bold">Blogs</h1>
                    
                    <p className="text-gray-600">Blogs by GDSC achievers</p>
                </div>
            </div>
            
            <button
          className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Add Blog
        </button>
        </div>
      

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md relative">
            <span
              className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2 className="text-center font-bold text-xl mb-4">Add Blog</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                value={blogTitle}
                onChange={handleTitleChange}
                required
                placeholder="Title"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                name="category"
                placeholder="Category"
                id="category"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <label className="border-dashed border-2 border-gray-500 p-4 rounded cursor-pointer flex flex-col items-center">
                <span className="text-gray-700">Drop Thumbnail here</span> (or)
                <input
                  className="hidden"
                  type="file"
                  id="images"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImageChange1}
                />
              </label>
              <button
                type="button"
                onClick={handleAddBlog}
                className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      <div>
        <div
          className="mx-auto g-4 row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 mt-2 p-4"
        >
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="card m-3"
                style={{ background: "rgb(217, 184, 255)", padding: "10px", borderRadius: "8px", width: "26rem" }}
                onClick={() => navigate("/blogs/single-blog", { state: blog })}
              >
                <div className="card-body text-center">
                  <div className="d-flex">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="card-img-top border border-4 border-light"
                      style={{ width: "110px", height: "110px", borderRadius: "8px" }}
                    />
                    {blog.description.length < 140 ? (
                      <h5 className="card-title mt-3 ms-3" dangerouslySetInnerHTML={{ __html: blog.description }}></h5>
                    ) : (
                      <h5 className="card-title mt-3 ms-3" dangerouslySetInnerHTML={{ __html: blog.description.substr(0, 136) + "..." }}></h5>
                    )}
                  </div>
                  <div className="d-flex justify-content-center mt-3 text-black">
                    <span className="badge badge-pill badge-dark mx-1" style={{ backgroundColor: "#D1C4E9" }}>{blog.category}</span>
                    <span className="badge badge-pill badge-light mx-1" style={{ backgroundColor: "#D1C4E9" }}>Internship</span>
                    <span className="badge badge-pill badge-light mx-1" style={{ backgroundColor: "#D1C4E9" }}>2025 Batch</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminShowBlogs;
