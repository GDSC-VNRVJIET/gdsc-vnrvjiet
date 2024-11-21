import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

interface FormData {
  author?: string;
  title?: string;
  description: string;
  category?: string;
  thumbnail?: string;
  domain?: string;
  show: boolean;
  isCommunity: boolean;
}
const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const blogType = state?.blogType;
  const [description, setDescription] = useState<string>('');
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      userId: number,
      role : string
    } | null
  );
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

  const createBlog = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/addblog/add`,
        formData,
      );

      if (response.data.status === "Sent successfully") {
        window.alert("Blog Added Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    if (blogType === "achiever") {
      formData.append("title", state?.blogTitle);
      formData.append("description", description);
      formData.append("category", state?.categories);
      formData.append("thumbnail", state?.base64Image);
      formData.append("author", state?.author);
    } else if (blogType === "community") {
      formData.append("domain", state?.domain);
      formData.append("title", state?.blogTitle);
      formData.append("description", description);
      formData.append("thumbnail", state?.base64Image); 
    }
    formData.append("show", "false"); 
    formData.append("isCommunity", blogType === "community" ? "true" : "false");
    createBlog(formData as any);
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
