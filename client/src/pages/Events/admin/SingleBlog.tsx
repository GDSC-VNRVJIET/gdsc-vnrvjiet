import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const deleteBlog = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_URL}/addblog/delete/${blogId}`
      );
      if (response.data.success === true) {
        alert("Blog deleted successfully");
        navigate("/blogs");
      } else {
        alert("Blog already deleted");
      }
    } catch (error) {
      console.log("Error:", error);
    }
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
    <div className="px-4 md:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto my-8 p-6 md:p-8 lg:p-10 bg-white shadow-lg rounded-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">{blog.title}</h2>
          {user?.role === "admin" && blog?.show === "true" && (
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button
                onClick={() => navigate(`/edit-blog/${blogId}`)}
                className="text-sm md:text-base text-slate-800 hover:text-blue-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-3 py-2"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-sm md:text-base text-slate-800 hover:text-red-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-3 py-2"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <img
          src={blog.thumbnail}
          alt=""
          className="rounded-md mb-4 w-full max-h-[450px] object-contain mt-4"
        />
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <span className="font-medium">by {blog.author}</span>
          <span className="text-gray-400">• in {blog.category}</span>
        </div>
        <hr className="my-6 border-t-2 border-gray-200" />
        <p
          className="mb-4 text-gray-600 text-justify leading-relaxed"
          style={{ textAlignLast: "left" }}
          dangerouslySetInnerHTML={{
            __html: blog.description.replace(
              /<img/g,
              '<img style="display: block; margin: 0 auto; padding-top:20px; padding-bottom:20px;"'
            ),
          }}
        ></p>
        {user?.role === "admin" && blog?.show === "false" && (
          <button
            onClick={handleClick}
            className="w-full md:w-auto border border-green-500 text-green-500 font-bold py-2 px-4 rounded mt-4 md:mt-0"
          >
            Post Blog
          </button>
        )}
      </article>
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6v4m0 4h.01M4 5h12l-1 10a2 2 0 01-2 2H7a2 2 0 01-2-2L4 5Z"
                />
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={deleteBlog}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
