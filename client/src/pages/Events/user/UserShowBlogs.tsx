import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";
import CarouselBlog from "../CarouselBlog";

interface Blog {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  category: string;
  [key: string]: any;
  date: string;
  isCommunity: string; // "true" or "false"
  domain: string;
}

const UserShowBlogs: React.FC = () => {
  const colors = [
    "bg-gradient-to-b from-green-600 to-green-600",
    "bg-gradient-to-r from-blue-600 to-blue-600",
    "bg-gradient-to-r from-yellow-500 to-yellow-500",
  ];
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [displayLoader, setDisplayLoader] = useState(true);
  const [blogType, setBlogType] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/gettrueblogs`
        );

        if (Array.isArray(response.data.payload)) {
          setBlogs(response.data.payload);
          setFilteredBlogs(response.data.payload);
          setDisplayLoader(false);
        } else {
          console.error("Unexpected response format: payload is not an array");
          setDisplayLoader(false);
          setBlogs([]);
          setFilteredBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setDisplayLoader(false);
        setBlogs([]);
        setFilteredBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  const filterBlogsByType = (isCommunity: string) => {
    const filtered = blogs.filter((blog) => blog.isCommunity === isCommunity);
    setFilteredBlogs(filtered);
  };

  // Show all blogs
  const showAllBlogs = () => {
    setFilteredBlogs(blogs);
  };

  return displayLoader ? (
    <Loader />
  ) : (
    <div>
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <div className="flex items-center ml-6">
          <div className="bg-white rounded-lg p-2 shadow-md flex items-center justify-center h-20">
            <img
              src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png"
              alt="GDSC Logo"
              className="h-10 w-15"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">Blogs</h1>
            <p className="text-gray-600">Blogs by GDGC achievers</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={()=>{
            showAllBlogs()
            setBlogType("all")
          }}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700"
        >
          All Posts
        </button>

        <button
          onClick={() => {filterBlogsByType("false")
          setBlogType("achievers")
          }}
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
        >
          Blogs by Achievers
        </button>

        <button
          onClick={() => {filterBlogsByType("true")
            setBlogType("community")
          }}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          Community Blogs
        </button>
      </div>

      <div>
          <CarouselBlog blogs={filteredBlogs} type={blogType} />
      </div>
    </div>
  );
};

export default UserShowBlogs;
