import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";
import CarouselBlog from "../CarouselBlog";
import { motion } from "framer-motion";

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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [displayLoader, setDisplayLoader] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === "/blogs/achievers") {
      filterBlogsByType("false");
      setActiveTab("achievers");
    } else if (location.pathname === "/blogs/community") {
      filterBlogsByType("true");
      setActiveTab("community");
    } else {
      showAllBlogs();
      setActiveTab("all");
    }
  }, [location.pathname]);

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
      {/* <div className="bg-gray-100 p-4 flex items-center justify-between">
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
          </div>
        </div>
      </div> */}

      <div className="flex  items-center space-x-4 mt-6 ml-6 relative">
        <button
          onClick={() => {
            navigate("/blogs");
          }}
          className="relative text-black px-4 py-2 font-semibold text-xl focus:outline-none"
        >
          All Blogs
          {activeTab === "all" && (
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-full bg-black"
              layoutId="underline"
            />
          )}
        </button>

        <div className="h-10 w-[2px] bg-gray-600"></div>

        <button
          onClick={() => {
            navigate("/blogs/achievers");
          }}
          className="relative text-black px-4 py-2 font-semibold focus:outline-none"
        >
          Blogs by GDGC Achievers
          {activeTab === "achievers" && (
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-full bg-black"
              layoutId="underline"
            />
          )}
        </button>

        <button
          onClick={() => {
            navigate("/blogs/community");
          }}
          className="relative text-black px-4 py-2 font-semibold focus:outline-none"
        >
          Community Blogs
          {activeTab === "community" && (
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] w-full bg-black"
              layoutId="underline"
            />
          )}
        </button>
      </div>

      <div>
        <Outlet context={{blogs:filteredBlogs,type:activeTab}}></Outlet>
      </div>
    </div>
  );
};

export default UserShowBlogs;

