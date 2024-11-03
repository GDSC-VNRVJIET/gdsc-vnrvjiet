import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";

interface Blog {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  category: string;
  [key: string]: any;
  date: string;
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
                <div className="max-w-6xl mx-auto px-8 py-2">
                  <article
                    className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 group"
                    onClick={() => handleBlogClick(blog._id)}
                  >
                    <div className="relative block group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-2">
                      <div
                        className="absolute inset-0 bg-gray-200 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none rounded-xl"
                        aria-hidden="true"
                      ></div>
                      <figure className="relative h-[400px] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out rounded-xl">
                        <img
                          className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out rounded-xl"
                          src={blog.thumbnail}
                          width="540"
                          height="303"
                          alt="Blog post"
                        />
                      </figure>
                    </div>
                    <div className="flex flex-col h-[400px] justify-between group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-6">
                      <header>
                        <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3">
                          <a className="hover:text-blue-500 transition duration-150 ease-in-out">
                            {blog.title}
                          </a>
                        </h3>
                      </header>
                      <div className="flex-grow overflow-hidden mb-4">
                        <div
                          className="text-gray-600 text-lg prose max-w-none line-clamp-6"
                          dangerouslySetInnerHTML={{
                            __html: blog.description,
                          }}
                        />
                      </div>
                      <div>
                        <div className="mb-3 flex flex-wrap font-medium text-sm -m-1">
                          {blog.category.split(",").map((cat, idx) => (
                            <span key={idx} className="m-1">
                              <span
                                className={`inline-flex text-center text-gray-100 py-2 px-4 rounded-full transition duration-150 ease-in-out ${
                                  colors[idx % colors.length]
                                }`}
                              >
                                {cat.trim()}
                              </span>
                            </span>
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