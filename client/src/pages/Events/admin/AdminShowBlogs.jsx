import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminShowBlogs.css';

function AdminShowBlogs() {
  const [showModal, setShowModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [avatar,setAvatar] = useState("");  
  const navigate = useNavigate();
  const [thumbnail,setThumbnail] = useState('');

  const handleTitleChange = (e) => setBlogTitle(e.target.value);
  const handleImageChange = (e) => setBlogImage(e.target.files[0]);

  const handleAddBlog = () => {
    console.log('Blog Title:', blogTitle);
    console.log('Blog Image:', blogImage);
    navigate('/add-blog'); 
    setShowModal(false);
  };
  const blogs = [
    {
      title: 'Sample Blog 1',
      date: '2024-06-01',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, commodi.',
    },
    {
      title: 'Sample Blog 2',
      date: '2024-06-02',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, commodi..',
    },
    {
      title: 'Sample Blog 3',
      date: '2024-06-03',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, commodi.',
    },
  ];

  return (
    <div>
      <div className='btn-container'>
      <button className="add-blog-button" onClick={() => setShowModal(true)}>
        + Add Blog
      </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className='text-center p-2'><b>Add Blog</b></h2>
            <form>
                <input type="text" value={blogTitle} onChange={handleTitleChange} required placeholder='Title'/>

                <label
              className="drop-container"
            >
              <span className="drop-title">Drop Author DP here</span> (or)
              <input
                className=""
                type="file"
                id="authorimages"
                onChange={(e)=>setAvatar(e.target.files[0])}
                accept="png,jpg,jpeg"
              />
            </label>
            <label
              className="drop-container"
            >
              <span className="drop-title">Drop Thumbnail here</span> (or)
              <input
                className=""
                type="file"
                id="images"
                accept="png,jpg,jpeg"
                onChange={(e)=>setThumbnail(e.target.files[0])}
              />
            </label>
              <button type="button" onClick={handleAddBlog} className='add-blog-button'>
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      <div>
        <p className='text-3xl text-slate-800 font-bold m-5 '>Blogs</p>
        <div className="blog-list">
      {blogs.map((blog, index) => (
        <div key={index} className="blog-card">
          <img src={blog.thumbnail} alt={blog.title} className="blog-thumbnail" />
          <div className="blog-content">
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-date">{blog.date}</p>
            <p className="blog-description">{blog.description}</p>
            <button className="read-more-button">Read More</button>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}

export default AdminShowBlogs;