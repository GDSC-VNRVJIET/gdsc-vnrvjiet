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
  isCommunity: string;
}

const SingleBlog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [displayLoader, setDisplayLoader] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const colors = [
    "bg-gradient-to-b from-sky-400 to-blue-500",
    "bg-gradient-to-r from-pink-600 to-rose-400",
    "bg-gradient-to-r from-emerald-600 to-teal-500",
  ];
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
        await axios.post(
          `${process.env.REACT_APP_BACK_URL}/sendmail/thank-author`,
          { blogId: blogId }
        );
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
          <div className="mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-center">
              {blog.title}
            </h2>
          </div>
          {user?.role === process.env.REACT_APP_ADMIN_ROLE && (
            <div className="inline-flex items-center justify-center rounded-md shadow-sm">
              <button
                onClick={() => navigate(`/edit-blog/${blogId}`)}
                className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                <span className="hidden md:inline-block text-blue-600">
                  Edit
                </span>
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2 2 0 01-2.244 2.077H8.084a2 2 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
          className="rounded-md mb-4 w-full max-h-[450px] object-contain mt-4"
        />
        <div>
          {blog.isCommunity !== "true" && (
            <div className="text-center md:text-right">
              <span className="block font-bold text-sm">
                By : {blog.author}
              </span>
            </div>
          )}
          {blog.isCommunity !== "true" && (
            <div className="mb-3 flex flex-wrap mt-3 justify-center font-medium text-xs md:text-sm -m-1">
              {(blog.category || "").split(",").map((cat, idx) => (
                <ul key={idx} className="">
                  <li className="m-1">
                    <a
                      className={`inline-flex text-center text-gray-100 py-1 px-3 md:py-2 md:px-4 rounded-full transition duration-150 ease-in-out ${
                        colors[idx % colors.length]
                      }`}
                    >
                      {cat.trim()}
                    </a>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
        <hr className="my-6 border-t-2 border-gray-200" />
        <p
          className="mb-4 text-gray-600 text-justify leading-relaxed md:text-lg sm:text-base text-sm"
          style={{ textAlignLast: "left" }}
          dangerouslySetInnerHTML={{
            __html: blog.description
              .replace(
                /<img/g,
                '<img style="display: block; margin: 0 auto; padding-top: 20px; padding-bottom: 20px; max-width: 100%; height: auto;"'
              )
              .replace(
                /<a /g,
                '<a target="_blank" rel="noopener noreferrer" style="color: #1A0DAB; text-decoration: underline; word-break: break-word;" '
              ),
          }}
        ></p>
        {user?.role === process.env.REACT_APP_ADMIN_ROLE &&
          blog.show === "false" && (
            <button
              onClick={handleClick}
              className="w-full md:w-1/3 mx-auto mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Post Blog
            </button>
          )}
      </article>
      {isModalVisible && (
        <div
          className={`${
            isModalVisible ? "block" : "hidden"
          } fixed inset-0 z-50 flex items-center justify-center`}
        >
          <div className="bg-gray-700 bg-opacity-75 absolute inset-0"></div>
          <div className="relative bg-white w-full md:w-1/3 p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteBlog}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
