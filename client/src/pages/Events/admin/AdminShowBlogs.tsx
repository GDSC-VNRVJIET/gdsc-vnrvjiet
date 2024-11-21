import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CurrentBlogs from "./CurrentBlogs";
import Loader from "../../Loader";
import { motion } from "framer-motion";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Carousel,
  Typography,
  Avatar,
} from "@material-tailwind/react";

interface Blog {
  author?: string;
  thumbnail?: string;
  title?: string;
  description: string;
  category?: string;
  domain?: string;
  isCommunity: string;
  [key: string]: any; // In case there are other fields not mentioned
}

interface CommunityBlog {
  title: string;
  thumbnail: string;
  domain: string;
  description: string;
  [key: string]: any; // In case there are other fields not mentioned
}

const AdminShowBlogs: React.FC = () => {
  // when we press the give access button then a modal should be opened to send a mail to the user
  const colors = [
    "bg-gradient-to-b from-sky-400 to-blue-500",
    "bg-gradient-to-r from-pink-600 to-rose-400",
    "bg-gradient-to-r from-emerald-600 to-teal-500",
  ];
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
  const [blogType, setBlogType] = useState<"achiever" | "community">(
    "achiever"
  );
  const [domain, setDomain] = useState<string>("");
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

        // Ensure response.data.payload is an array
        if (Array.isArray(response.data.payload)) {
          setBlogs(response.data.payload);
          setDisplayLoader(false);
        } else {
          console.error("Unexpected response format: payload is not an array");
          console.log(response.data.payload);
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
  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDomain(e.target.value);
  };

  const handleAddBlog = () => {
    const blogData =
      blogType === "achiever"
        ? { blogType, base64Image, blogTitle, categories, author }
        : { blogType, base64Image, blogTitle, domain };

    navigate("/add-blog", { state: blogData });
    setShowModal(false);
  };

  function replaceBlackWithWhite(htmlContent: string) {
    return htmlContent.replace(/rgb\(0, 0, 0\)/g, "rgb(255, 255, 255)");
  }

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
      if (res.data.status === "success") {
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
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setBlogType("achiever")}
                  className={`py-2 px-4 rounded ${
                    blogType === "achiever"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Achiever Blog
                </button>
                <button
                  type="button"
                  onClick={() => setBlogType("community")}
                  className={`py-2 px-4 rounded ${
                    blogType === "community"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Community Blog
                </button>
              </div>
              {blogType === "achiever" ? (
                <>
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
                        <span className="text-gray-700">
                          Drop Thumbnail here
                        </span>{" "}
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
                </>
              ) : (
                <>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={handleTitleChange}
                    required
                    placeholder="Title"
                    className="p-2 border border-gray-300 rounded"
                  />
                  <select
                    value={domain}
                    onChange={handleDomainChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Domain</option>
                    <option value="web-development">Web Development</option>
                    <option value="machine-learning">Machine Learning</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="design">Design</option>
                    <option value="cloud-computing">Cloud Computing</option>
                  </select>
                </div>
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
                        <span className="text-gray-700">
                          Drop Thumbnail here
                        </span>{" "}
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
                </>
              )}
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
          <div className="relative mt-3">
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              pagination={{ clickable: true }}
              breakpoints={{
                350: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <SwiperSlide key={blog._id}>
                    <Card
                      shadow={false}
                      className="relative grid w-11/12 min-h-[340px] mx-auto items-end justify-center overflow-hidden cursor-pointer"
                      onClick={() => handleBlogClick(blog._id)}
                    >
                      <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className={`absolute inset-0 m-0 h-full  w-full rounded-none bg-cover bg-center `}
                        style={{ backgroundImage: `url(${blog.thumbnail})` }}
                      >
                        <div className="to-bg-black-10 absolute inset-0 h-full  w-full bg-gradient-to-t from-black/80 via-black/50" />
                      </CardHeader>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex justify-center bg-black/70 text-white p-6 opacity-0 group-hover:opacity-100"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.description.length < 200
                                ? replaceBlackWithWhite(blog.description)
                                : replaceBlackWithWhite(
                                    blog.description.substring(0, 196) + "..."
                                  ),
                          }}
                        />
                      </motion.div>

                      <CardFooter className="align-bottom absolute z-10 px-10 py-10 text-left w-full text-white group-hover:opacity-0 transition-opacity duration-300">
                        <Typography className="text-white " variant="h4">
                          {blog.title}
                        </Typography>
                        <Typography className="text-gray-300 " variant="small">
                          {blog.date} •
                          <img
                            className="rounded-full flex-shrink-0 mr-2 mb-4 inline w-6 ms-4"
                            src="https://tse2.mm.bing.net/th?id=OIP.XadmtOiEEI6Zv388n5l2dQHaHx&pid=Api&P=0&h=220"
                            width="40"
                            height="40"
                            alt="Author 04"
                          />
                          {blog.author} <br />
                          {blog?.category &&
                            blog.category.split(",").map((cat, idx) => (
                              <span key={idx}>
                                <u className="me-2 cursor-pointer">#{cat}</u>
                              </span>
                            ))}
                        </Typography>
                      </CardFooter>
                    </Card>
                  </SwiperSlide>
                ))
              ) : (
                <p>No blogs available.</p>
              )}
            </Swiper>
          </div>
        ) : (
          <CurrentBlogs />
        )}
      </div>
    </div>
  );
};

export default AdminShowBlogs;
