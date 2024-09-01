import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CurrentBlogs from "./CurrentBlogs";
import Loader from "../../Loader";
interface Blog {
  author: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  [key: string]: any; // In case there are other fields not mentioned
}

const AdminShowBlogs: React.FC = () => {
  // when we press the give access button then a modal should be opened to send a mail to the user

  const [showModal, setShowModal] = useState<boolean>(false);
  const [mailModal, setMailModal] = useState<boolean>(false);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [mail, setMail] = useState("");
  const [base64Image, setBase64Image] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([""]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");
  const [showRadioButtons, setShowRadioButtons] = useState<boolean>(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const activateTab = (tab: "tab1" | "tab2") => {
    setActiveTab(tab);
  };
  const [displayLoader, setDisplayLoader] = useState(true);
  // function handleAccess() {
  //   setMailModal(true);
  // }
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/getfalseblogs`
        );
        console.log("Fetched blogs:", response.data.payload);

        // Ensure response.data.payload is an array
        if (Array.isArray(response.data.payload)) {
          setBlogs(response.data.payload);
          setDisplayLoader(false);
        } else {
          console.error("Unexpected response format: payload is not an array");
          setBlogs([]);
          setDisplayLoader(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setDisplayLoader(false);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBlogTitle(e.target.value);
  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMail(e.target.value);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleAddBlog = () => {
    console.log("Blog Title:", blogTitle);
    navigate("/add-blog", {
      state: [base64Image, blogTitle, categories, author],
    });
    setShowModal(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setFileName("");
    setBase64Image("");
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      addCategoryField();
    }
  };

  const addCategoryField = () => {
    if (categories.length < 3) {
      setCategories([...categories, ""]);
    }
  };

  const removeCategoryField = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };
  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };
  const handleAccess = () => {
    setShowRadioButtons(true); // Show radio buttons for blog selection
  };

  const handleBlogSelection = (blogId: string) => {
    setSelectedBlogId(blogId);
    setMailModal(true); // Open the mail modal
  };
  const handleGiveAccess = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/sendmail/give-access-mail`,
        { mail, blogId: selectedBlogId } // Send the selected blog ID with the email
      );
      console.log(res.data);
      if (res.data.status === "success") {
        console.log("Email sent successfully");
        setMailModal(false); // Close the modal upon successful email sending
        setShowRadioButtons(false); // Hide radio buttons after sending the email
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  return displayLoader ? (
    <Loader />
  ) : (
    <div>
      <div className="bg-gray-100 p-4 flex items-center justify-end">
        {activeTab === "tab1" && (
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer mr-3"
              onClick={() => setShowModal(true)}
            >
              + Add Blog
            </button>
            {/* Change the button colour */}

            <button
              onClick={handleAccess}
              className="bg-gray-800 text-white py-2 px-4 rounded cursor-pointer"
            >
              Give Access
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md relative">
            <span
              className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2 className="text-center font-bold text-xl mb-4">Add Blog</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                value={blogTitle}
                onChange={handleTitleChange}
                required
                placeholder="Title"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={author}
                onChange={handleAuthorChange}
                required
                placeholder="Author"
                className="p-2 border border-gray-300 rounded"
              />
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) =>
                      handleCategoryChange(index, e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Category"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeCategoryField(index)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {categories.length < 3 && (
                <button
                  type="button"
                  onClick={addCategoryField}
                  className="bg-green-500 text-white py-1 rounded"
                >
                  + Add Category
                </button>
              )}
              <div className="flex flex-col items-center">
                {fileName ? (
                  <div className="flex items-center justify-between w-full p-4 border-dashed border-2 border-gray-500 rounded">
                    <span className="text-gray-700">{fileName}</span>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <label className="border-dashed border-2 border-gray-500 p-4 rounded cursor-pointer flex flex-col items-center">
                    <span className="text-gray-700">Drop Thumbnail here</span>{" "}
                    (or)
                    <input
                      className="hidden"
                      type="file"
                      id="images"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <button
                type="button"
                onClick={handleAddBlog}
                className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      {mailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md relative">
            <span
              className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-900"
              onClick={() => setMailModal(false)}
            >
              &times;
            </span>
            <h2 className="text-center font-bold text-xl mb-4">Give Access</h2>
            <form className="flex flex-col gap-4">
              <input
                type="mail"
                value={mail}
                onChange={handleMailChange}
                required
                placeholder="Email"
                className="p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={handleGiveAccess}
                className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
              >
                Share
              </button>
            </form>
          </div>
        </div>
      )}
      <div>
        <ul className="flex mt-3 flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 justify-center">
          <li className="me-2">
            <button
              onClick={() => activateTab("tab1")}
              className={`inline-block px-4 py-3 rounded-lg ${
                activeTab === "tab1"
                  ? "text-white bg-blue-600"
                  : "hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
              }`}
              aria-current={activeTab === "tab1" ? "page" : undefined}
            >
              Temporary
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => activateTab("tab2")}
              className={`inline-block px-4 py-3 rounded-lg ${
                activeTab === "tab2"
                  ? "text-white bg-blue-600"
                  : "hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
              }`}
              aria-current={activeTab === "tab2" ? "page" : undefined}
            >
              Current
            </button>
          </li>
        </ul>
        {activeTab === "tab1" ? (
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
                        alt={blog.title}
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-gray-800 to-gray-500 text-white">
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                      </div>
                    </div>
                    {showRadioButtons && (
                      <input
                        type="radio"
                        name="selectedBlog"
                        value={blog._id}
                        onChange={() => handleBlogSelection(blog._id)}
                        className="absolute top-4 right-4 border-8 border-blue-600"
                      />
                    )}
                    <div
                      onClick={() => handleBlogClick(blog._id)}
                      className="flex flex-col justify-between gap-3 px-4 py-2"
                    >
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
        ) : (
          <CurrentBlogs />
        )}
      </div>
    </div>
  );
};

export default AdminShowBlogs;
