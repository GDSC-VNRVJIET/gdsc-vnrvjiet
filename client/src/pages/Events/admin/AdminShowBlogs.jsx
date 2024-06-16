import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminShowBlogs() {
  const [showModal, setShowModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [base64Image1, setBase64Image1] = useState('');
  const [base64Image2, setBase64Image2] = useState('');
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/addblog/getblogs`);
        console.log('Fetched blogs:', response.payload); 
        setBlogs(response.data.payload);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleTitleChange = (e) => setBlogTitle(e.target.value);
  const handleImageChange = (e) => setBlogImage(e.target.files[0]);

  const handleAddBlog = () => {
    console.log('Blog Title:', blogTitle);
    console.log('Blog Image:', blogImage);
    navigate('/add-blog',{state:[base64Image1,base64Image2]}); 
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
  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="text-right mb-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer" onClick={() => setShowModal(true)}>
          + Add Blog
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md relative">
            <span className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-900" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="text-center font-bold text-xl mb-4">Add Blog</h2>
            <form className="flex flex-col gap-4">
              <input type="text" value={blogTitle} onChange={handleTitleChange} required placeholder="Title" className="p-2 border border-gray-300 rounded"/>
              <label className="border-dashed border-2 border-gray-500 p-4 rounded cursor-pointer flex flex-col items-center">
                <span className="text-gray-700">Drop Author DP here</span> (or)
                <input
                  className="hidden"
                  type="file"
                  id="authorimages"
                  onChange={ handleImageChange2}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </label>
              <label className="border-dashed border-2 border-gray-500 p-4 rounded cursor-pointer flex flex-col items-center">
                <span className="text-gray-700">Drop Thumbnail here</span> (or)
                <input
                  className="hidden"
                  type="file"
                  id="images"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={ handleImageChange1}
                />
              </label>
              <button type="button" onClick={handleAddBlog} className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      <div>
        <p className="text-3xl text-gray-800 font-bold m-5">Blogs</p>
        <div className="flex flex-wrap justify-center p-5 gap-5">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="border border-gray-300 rounded-lg shadow-md overflow-hidden w-72 transition-transform transform hover:-translate-y-2">
                <img src={blog.avatar} alt={blog.title} className="w-full h-40 object-cover"/>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{blog.date}</p>
                  <p className="text-gray-700 mb-4">{blog.description}</p>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700">Read More</button>
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
