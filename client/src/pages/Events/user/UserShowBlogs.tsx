import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserById } from "../../../Apis/users";
import Loader from "../../Loader";

interface Blog {
  id: string; // Assuming each blog has a unique ID
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  category: string;
  [key: string]: any;
  date:string;
}

const UserShowBlogs: React.FC = () => {
  const colors = [
    "bg-gradient-to-b from-green-600 to-green-600",
    "bg-gradient-to-r from-blue-600 to-blue-600",
    "bg-gradient-to-r from-yellow-500 to-yellow-500",
  ];
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [displayLoader, setDisplayLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/gettrueblogs`
        );

        if (Array.isArray(response.data.payload)) {
          setBlogs(response.data.payload);
          setDisplayLoader(false);
        } else {
          console.error("Unexpected response format: payload is not an array");
          setDisplayLoader(false);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setDisplayLoader(false);
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

      <div>
        <ul className="mt-10">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <section
                key={blog._id}
                className="flex flex-col justify-center antialiased mb-20"
              >
                <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
                  <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                    <a className="relative block group">
                      <div
                        className="absolute inset-0 bg-gray-200 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none"
                        aria-hidden="true"
                      ></div>
                      <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                        <img
                          className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                          src={blog.thumbnail}
                          onClick={() => handleBlogClick(blog._id)}
                          style={{ cursor: "pointer" }}
                          width="540"
                          height="303"
                          alt="Blog post"
                        />
                      </figure>
                    </a>
                    <div>
                      <header>
                        <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                          <a className="hover:text-blue-500 transition duration-150 ease-in-out">
                            {blog.title}
                          </a>
                        </h3>
                      </header>
                      {/* <p className="text-lg text-gray-400 flex-grow">
                        {blog.description}
                      </p> */}
                      {blog.description.length < 140 ? (
                        <p
                          className="text-gray-600 text-lg two-lines"
                          dangerouslySetInnerHTML={{ __html: blog.description }}
                        ></p>
                      ) : (
                        <p
                          className="text-gray-600 text-lg two-lines"
                          dangerouslySetInnerHTML={{
                            __html: blog.description.substring(0, 136) + "...",
                          }}
                        ></p>
                      )}
                      <a
                        style={{ cursor: "pointer" }}
                        className="inline-flex items-center py-2 space-x-2 text-sm dark:text-violet-600 hover:underline"
                        onClick={() => handleBlogClick(blog._id)}
                      >
                        <span style={{ color: "#3b82f6" }}>Read more</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="#3b82f6"
                          className="w-4 h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </a>
                      <div className="mb-3 flex flex-wrap font-medium text-sm -m-1">
                        {blog.category.split(",").map((cat, idx) => (
                          <ul className="">
                            <li className="m-1">
                              <a
                                className={`inline-flex text-center text-gray-100 py-2 px-4 rounded-full transition duration-150 ease-in-out ${
                                  colors[idx % colors.length]
                                }`}
                              >
                                {cat.trim()}
                              </a>
                            </li>
                          </ul>
                        ))}
                      </div>
                      <footer className="flex items-center mt-4">
                        <a>
                          <img
                            className="rounded-full flex-shrink-0 mr-4"
                            src="https://tse2.mm.bing.net/th?id=OIP.XadmtOiEEI6Zv388n5l2dQHaHx&pid=Api&P=0&h=220"
                            width="40"
                            height="40"
                            alt="Author 04"
                          />
                        </a>
                        <div>
                          <a className="font-medium text-gray-800 hover:text-green-400 transition duration-150 ease-in-out">
                            {blog.author}
                          </a>
                          <span className="text-gray-700"> - </span>
                          <span className="text-gray-500">{blog.date}</span>
                        </div>
                      </footer>
                    </div>
                  </article>
                </div>
              </section>
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
