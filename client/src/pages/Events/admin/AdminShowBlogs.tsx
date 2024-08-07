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

const AdminShowBlogs: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [base64Image1, setBase64Image1] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([""]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/getblogs`
        );
        console.log("Fetched blogs:", response.data.payload);

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBlogTitle(e.target.value);

  const handleAddBlog = () => {
    console.log("Blog Title:", blogTitle);
    navigate("/add-blog", { state: [base64Image1, blogTitle, categories] });
    setShowModal(false);
  };

  const handleImageChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image1(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
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
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Add Blog
        </button>
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
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
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
              <label className="border-dashed border-2 border-gray-500 p-4 rounded cursor-pointer flex flex-col items-center">
                <span className="text-gray-700">Drop Thumbnail here</span> (or)
                <input
                  className="hidden"
                  type="file"
                  id="images"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImageChange1}
                />
              </label>
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
      <div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-2 xl:p-5">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                onClick={() => navigate("/blogs/single-blog", { state: blog })}
              >
                <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-primary-400">
                  <div className="relative w-full aspect-video">
                    <img
                      className="rounded object-cover mx-auto w-full"
                      src={blog.thumbnail}
                      style={{height:"19rem"}}
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
                          __html: blog.description.substr(0, 136) + "...",
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

export default AdminShowBlogs;
