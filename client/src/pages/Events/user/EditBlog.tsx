import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  createdBy: number;
}

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  console.log(id)
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");

  // get local storage details
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      token: string;
    } | null
  );
  // console.log(user)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/addblog/getblog/${id}`
        );
        const blogData = response.data.payload;
        setBlog(blogData);
        setTitle(blogData.title);
        setDescription(blogData.description);
        setCategories(blogData.category.split(","));
        setThumbnail(blogData.thumbnail);
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
        updatedBlog,
        // { withCredentials: true, headers: { Authorization: `Bearer ${user?.token}` } }
      );

      // console.log("Response from backend:", response.data.message);
      console.log(response)
      if (response.data.message === "Blog updated successfully") {
        alert("Blog updated successfully!");
        navigate(`/blogs/${id}`);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
};




  // const handleUpdateBlog = async () => {
  //   try {
  //     const updatedBlog = {
  //       title,
  //       description,
  //       category: categories.join(","),
  //       thumbnail: base64Image || thumbnail,
  //     };

  //     console.log(updatedBlog)
  //     // add access control allow origin header
  //     const response = await axios.put(
  //       `${process.env.REACT_APP_BACK_URL}/addblog/updateblog/${id}`,

  //       updatedBlog,
  //       {withCredentials:true , headers:{Authorization:`Bearer ${user?.token}`}}
  //     );
  //     console.log(response.data.message)
  //     if(response.data.message === "Blog updated successfully"){
  //       alert("Blog updated successfully!");
  //       navigate(`/blogs/${id}`);
  //     }

  //     // alert("Blog updated successfully!");
      
  //   } catch (error) {
  //     console.error("Error updating blog:", error);
  //   }
  // };

  return blog ? (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
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
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mb-4"
        />
        {/* <label className="border-dashed border-2 border-gray-500 p-4 rounded cursor-pointer flex flex-col items-center">
          <span className="text-gray-700">Change Thumbnail (optional)</span>
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleImageChange}
          />
        </label> */}
        {/* {thumbnail && !base64Image && (
          <img
            src={thumbnail}
            alt="Current Thumbnail"
            className="max-w-full h-auto mt-4"
          />
        )} */}
        {/* {base64Image && (
          <img
            src={base64Image}
            alt="New Thumbnail"
            className="max-w-full h-auto mt-4"
          />
        )} */}
        <button
          type="button"
          onClick={handleUpdateBlog}
          className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  ) : (
    <p>Loading blog details...</p>
  );
};

export default EditBlog;
