import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserById } from "../../../Apis/users";

interface Blog {
  id: string; // Assuming each blog has a unique ID
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  [key: string]: any;
}

const UserShowBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/gettrueblogs`
        );

        if (Array.isArray(response.data.payload)) {
          setBlogs(response.data.payload);
          console.log("Fetched blogs:", response.data.payload);
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

  const [user] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      userId: number;
    } | null
  );

  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
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
            <p className="text-gray-600">Blogs by GDSC achievers</p>
          </div>
        </div>
      </div>

      <div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                
              >
                <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-primary-400">
                  <div className="relative w-full aspect-video">
                    <img
                      className="rounded object-cover mx-auto w-full"
                      src={blog.thumbnail}
                      style={{ height: "19rem" }}
                      alt={blog.title}
                      loading="lazy"
                      onClick={() => handleBlogClick(blog._id)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-gray-800 to-gray-500 text-white">
                      <h2 className="text-xl font-semibold">{blog.title}</h2>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-3 px-4 py-2">
                    <p
                      className="text-gray-600 two-lines"
                      dangerouslySetInnerHTML={{
                        __html: blog.description.length < 140
                          ? blog.description
                          : blog.description.substring(0, 136) + "...",
                      }}
                    ></p>
                    <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                      {blog.category.split(",").map((cat, idx) => (
                        <li
                          key={idx}
                          className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                        >
                          <span>{cat.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserShowBlogs;
