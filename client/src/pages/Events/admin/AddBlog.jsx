// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import "./AddBlog.css";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// function AddBlog() {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [description, setDescription] = useState('');
//   const [title, setTitle] = useState("");
//   const [authorname, setAuthorname] = useState("");
//   const [category, setCategory] = useState("");
//   const [thumbnail, setThumbnail] = useState(null);
//   const [avatar, setAvatar] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//   ];
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

//   const createBlog = async (formData, saved = false) => {
//     formData.title = title;
//     formData.description = description;
//     formData.thumbnail = thumbnail;
//     formData.avatar = avatar;
//     formData.category = category;
//     formData.authorname = authorname;
//     formData.saved = saved;
//     console.log(formData);
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/blog",
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );
//       if (response.status === 201) {
//         return navigate("/");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "An Error Occurred");
//     }
//   };

//   const onSubmit = (data) => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("authorname", authorname);
//     formData.append("thumbnail", thumbnail);
//     formData.append("avatar", avatar);
//     createBlog(formData, false); // For publishing the post
//   };

//   const onSave = (data) => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("authorname", authorname);
//     formData.append("thumbnail", thumbnail);
//     formData.append("avatar", avatar);
//     createBlog(formData, true); // For saving the post
//   };

//   return (
//     <div className="create-post">
//       <div className="containers">
//         {error && <p className="form__error-message">{error}</p>}
//         <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="forms create-post__form">
//           <input
//             className="helo"
//             type="text"
//             name="authorname"
//             value={authorname}
//             onChange={(e) => setAuthorname(e.target.value)}
//             id="authorname"
//             placeholder="Author Name"
//             autoFocus
//           />
//           <input
//             name="title"
//             onChange={(e) => setTitle(e.target.value)}
//             value={title}
//             className="helo"
//             type="text"
//             id="title"
//             placeholder="Title"
//           />
//           <input
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             type="text"
//             name="category"
//             placeholder="Category"
//             id="category"
//             className="helo"
//           />
//           {/* <label className="drop-container">
//             <span className="drop-title">Drop Author DP here</span> (or)
//             <input
//               className=""
//               type="file"
//               id="authorimages"
//               onChange={(e) => setAvatar(e.target.files[0])}
//               accept="image/png, image/jpg, image/jpeg"
//             />
//           </label>
//           <label className="drop-container">
//             <span className="drop-title">Drop Thumbnail here</span> (or)
//             <input
//               className=""
//               type="file"
//               id="images"
//               accept="image/png, image/jpg, image/jpeg"
//               onChange={(e) => setThumbnail(e.target.files[0])}
//             />
//           </label> */}
//           <ReactQuill
//             modules={modules}
//             formats={formats}
//             style={{ height: '500px' }}
//             value={description}
//             onChange={setDescription}
//           ></ReactQuill>
//           <div className="btn">
//             <button
//               style={{ marginBottom: "100px" }}
//               type="submit"
//               className="btns primarys"
//             >
//               Post
//             </button>
//             <button
//               style={{ marginBottom: "100px" }}
//               type="button"
//               className="btns primarys"
//               onClick={handleSubmit(onSave)}
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddBlog;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddBlog() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const createBlog = async (formData, saved = false) => {
    formData.title = title;
    formData.description = description;
    formData.thumbnail = thumbnail;
    formData.avatar = avatar;
    formData.category = category;
    formData.authorname = authorname;
    formData.saved = saved;
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/blog",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 201) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An Error Occurred");
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("authorname", authorname);
    formData.append("thumbnail", thumbnail);
    formData.append("avatar", avatar);
    createBlog(formData, false); // For publishing the post
  };

  const onSave = (data) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("authorname", authorname);
    formData.append("thumbnail", thumbnail);
    formData.append("avatar", avatar);
    createBlog(formData, true); // For saving the post
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="container mx-auto w-full h-full">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="authorname"
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
          ></ReactQuill>
          {/* <div className="mt-5">
            <label className="flex flex-col justify-center items-center h-32 p-5 border-2 border-dashed border-gray-500 rounded cursor-pointer transition duration-300 hover:bg-gray-200 hover:border-gray-700">
              <span className="font-bold text-center text-gray-700">Drop Thumbnail here</span>
              or
              <input
                className="hidden"
                type="file"
                id="images"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </label>
          </div>
          <div className="mt-5">
            <label className="flex flex-col justify-center items-center h-32 p-5 border-2 border-dashed border-gray-500 rounded cursor-pointer transition duration-300 hover:bg-gray-200 hover:border-gray-700">
              <span className="font-bold text-center text-gray-700">Drop Author DP here</span>
              or
              <input
                className="hidden"
                type="file"
                id="authorimages"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>
          </div> */}
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


