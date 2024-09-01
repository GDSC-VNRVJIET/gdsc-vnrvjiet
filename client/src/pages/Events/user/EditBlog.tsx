import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../../Loader";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  author: string;
}

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const [access, setAccess] = useState<boolean>(false);
  const [displayLoader, setDisplayLoader] = useState(true);

  useEffect(() => {
    // code for to give access to the particular person only
    const getUserData = async () => {
      try {
        if (user?.role === "admin") {
          setDisplayLoader(false);
          setAccess(true);
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/getAccessdata/${user?.emailId}`
        );
        if (response.data.success === true) {
          if (id === response.data.payload.blogId) {
            setAccess(true);
            setDisplayLoader(false);
          }
        }
      } catch (error) {}
    };
    getUserData();
  }, []);

  console.log(id);
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");
  const [author,setAuthor] = useState<string>("");

  // get local storage details
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      token: string;
      role: string;
      emailId: string;
    } | null
  );
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/getblog/${id}`
        );
        const blogData = response.data.payload;
        setBlog(blogData);
        setTitle(blogData.title);
        setAuthor(blogData.author);
        setDescription(blogData.description);
        setCategories(blogData.category.split(","));
        setThumbnail(blogData.thumbnail);
        setDisplayLoader(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
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
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const updatedBlog = {
        title,
        description,
        category: categories.join(","),
        thumbnail: base64Image || thumbnail,
      };

      console.log("Sending updated blog data:", updatedBlog);
      // add access control allow origin header
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/addblog/updateblog/${id}`,
        updatedBlog
        // { withCredentials: true, headers: { Authorization: `Bearer ${user?.token}` } }
      );

      // console.log("Response from backend:", response.data.message);
      console.log(response);
      if (response.data.message === "Blog updated successfully") {
        alert("Blog updated successfully!");
        navigate(`/blogs/${id}`);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return displayLoader ? (
    <Loader />
  ) : blog && access ? (
    <div className="container mx-auto p-4 max-w-4xl">
  <h2 className="text-3xl font-bold mb-6 text-center">Edit Blog</h2>
  <form className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
      />
      <input
        type="text"
        value={author}
        onChange={handleAuthorChange}
        placeholder="Author"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
      />
    </div>
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div key={index} className="flex items-center gap-4">
          <input
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
            placeholder="Category"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
          />
          <button
            type="button"
            onClick={() => removeCategoryField(index)}
            className="bg-red-500 text-white px-3 py-2 rounded-lg"
          >
            &times;
          </button>
        </div>
      ))}
      {categories.length < 3 && (
        <button
          type="button"
          onClick={addCategoryField}
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          + Add Category
        </button>
      )}
    </div>
    <div className="mb-4">
      <ReactQuill
        value={description}
        onChange={setDescription}
        className="border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
        style={{
          height: "300px",
          maxHeight: "500px",
          width: "100%",
          overflow: "auto",
        }}
      />
    </div>
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleUpdateBlog}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
      >
        Update Blog
      </button>
    </div>
  </form>
</div>

  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-6xl">Access Denied</p>
    </div>
  );
};

export default EditBlog;
