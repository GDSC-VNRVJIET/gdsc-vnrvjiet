import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Blog {
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  [key: string]: any; // In case there are other fields not mentioned
}

const TemporaryBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/gettrueblogs`
        );
        console.log("Fetched blogs:", response);

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

  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };
  return (
    <div>
      <div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index}>
               
                <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-primary-400">
                  <div className="relative w-full aspect-video">
                    <img
                      className="rounded object-cover mx-auto w-full"
                      src={blog.thumbnail}
                      style={{ height: "19rem" }}
                      key={index} onClick={() => handleBlogClick(blog._id)}
                      alt={blog.title}
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-gray-800 to-gray-500 text-white">
                      <h2 className="text-xl font-semibold">{blog.title}</h2>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-3 px-4 py-2">
                    {blog.description.length < 140 ? (
                      <p
                        className="text-gray-600 two-lines"
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                      ></p>
                    ) : (
                      <p
                        className="text-gray-600 two-lines"
                        dangerouslySetInnerHTML={{
                          __html: blog.description.substring(0, 136) + "...",
                        }}
                      ></p>
                    )}
                    
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

export default TemporaryBlogs;
