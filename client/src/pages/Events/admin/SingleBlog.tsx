import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";
import DeleteBlog from "./DeleteBlog";

interface Blog {
  show: string;
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );
  const handleDeleteClick = () => {
    setIsModalVisible(true); // Show the modal when delete button is clicked
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

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
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
          {user?.role === "admin" && blog?.show === "true" && (
            <div className="inline-flex items-center rounded-md shadow-sm">
              <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                <span className="hidden md:inline-block text-blue-600">
                  Edit
                </span>
              </button>
              <button onClick={handleDeleteClick} className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
                <span className="hidden md:inline-block text-red-600">
                  Delete
                </span>
              </button>
            </div>
          )}
        </div>
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
        {user?.role === "admin" && blog?.show === "false" && (
          <button
            onClick={handleClick}
            className="border border-green-500 text-green-500 font-bold py-2 px-4 rounded"
          >
            Post Blog
          </button>
        )}
      </article>
    </div>
  );
};

export default SingleBlog;
