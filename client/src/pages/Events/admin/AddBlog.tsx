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
  thumbnail: string;
}

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [description, setDescription] = useState<string>('');

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
    formData.description = description;
    
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
    formData.append("title", state[1]);
    formData.append("description", description);
    formData.append("category", state[2]);
    formData.append("thumbnail", state[0]);
    createBlog(formData as any, false);
  };

  const onSave: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    formData.append("title", state[1]);
    formData.append("description", description);
    formData.append("category", state[2]);
    formData.append("thumbnail", state[0]);
    console.log(formData);
    createBlog(formData as any, true);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full h-full">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className=""
        >
          <ReactQuill

            modules={modules}
            formats={formats}
            style={{ height: '600px' }}
            value={description}
            onChange={setDescription}
          />
          <div className="flex justify-center gap-4 mt-12">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 mt-5"
            >
              Post
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 mt-5"
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
