import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Blog {
  title: string;
  thumbnail: string;
  authorname: string;
  category: string;
  description: string;
}

const SingleBlog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/addblog/getblog/${blogId}`);
        setBlog(response.data.payload);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
  
    fetchBlog();
  }, [blogId]);
  

  if (!blog) {
    return <div>Loading blog data.....</div>;
  }

  return (
    <div>
      <article className="w-3/4 mx-auto my-8 p-9 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <img
          src={blog.thumbnail}
          alt=""
          className="rounded-md mb-4 w-full max-h-[450px] object-cover"
        />
        <div className="flex items-center space-x-2">
          <span className="font-medium">by {blog.authorname}</span>
          <span className="text-gray-400">• in {blog.category}</span>
        </div>
        <hr className="my-6 border-t-2 border-gray-200" />
        <p className="mb-4 text-gray-600" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
      </article>
    </div>
  );
};

export default SingleBlog;
