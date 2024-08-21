import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";

interface Blog {
  title: string;
  thumbnail: string;
  author: string;
  category: string;
  description: string;
}

const SingleBlog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [displayLoader, setDisplayLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/getblog/${blogId}`
        );
        setBlog(response.data.payload);
        setDisplayLoader(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);


  async function handleClick() {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/addblog/change/${blogId}`
      );
      if (response.data.success === true) {
        alert("Blog posted successfully");
        navigate("/blogs");
      } else {
        alert("Blog already posted");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return displayLoader || !blog ? (
    <Loader />
  ) : (
    <div>
      <article className="w-3/4 mx-auto my-8 p-9 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <img
          src={blog.thumbnail}
          alt=""
          className="rounded-md mb-4 w-full max-h-[450px] object-cover"
        />
        <div className="flex items-center space-x-2">
          <span className="font-medium">by {blog.author}</span>
          <span className="text-gray-400">• in {blog.category}</span>
        </div>
        <hr className="my-6 border-t-2 border-gray-200" />
        <p
          className="mb-4 text-gray-600"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></p>
        <button
          onClick={handleClick}
          className="border border-green-500 text-green-500 font-bold py-2 px-4 rounded"
        >
          Post Blog
        </button>
      </article>
    </div>
  );
};

export default SingleBlog;
