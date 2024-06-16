import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
  category: string;
  authorname: string;
  thumbnail: string;
  avatar: string;
}

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>("");
  const [authorname, setAuthorname] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const createBlog = async (formData: FormData, saved: boolean = false) => {
    formData.title = title;
    formData.description = description;
    formData.thumbnail = state[1];
    formData.avatar = state[0];
    formData.category = category;
    formData.authorname = authorname;
    console.log(formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/addblog/add`,
        formData,
      );

      if (response.data === "Sent successfully") {
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("authorname", authorname);
    formData.append("thumbnail", state[1]);
    formData.append("avatar", state[0]);
    createBlog(formData as any, false); // 'as any' to handle FormData type mismatch
  };

  const onSave: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("authorname", authorname);
    formData.append("thumbnail", state[1]);
    formData.append("avatar", state[0]);
    console.log(formData);
    createBlog(formData as any, true); // 'as any' to handle FormData type mismatch
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="container mx-auto w-full h-full">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={authorname}
            onChange={(e) => setAuthorname(e.target.value)}
            id="authorname"
            placeholder="Author Name"
            autoFocus
          />
          <input
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="title"
            placeholder="Title"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            name="category"
            placeholder="Category"
            id="category"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <ReactQuill
            modules={modules}
            formats={formats}
            style={{ height: '500px' }}
            value={description}
            onChange={setDescription}
          />
          <div className="flex justify-center gap-4 mt-12">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Post
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
              onClick={handleSubmit(onSave)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
