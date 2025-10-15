import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Keyboard,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

interface Blog {
  author?: string;
  thumbnail: string;
  title: string;
  description: string;
  category?: string;
  domain?: string;
  isCommunity: string;
  [key: string]: any;
}


const CarouselBlog: React.FC = () => {
  const { blogs, type } = useOutletContext<{ blogs: Blog[]; type: string }>();
  const navigate = useNavigate();

  function replaceBlackWithWhite(htmlContent: string) {
    return htmlContent.replace(/rgb\(0, 0, 0\)/g, "rgb(255, 255, 255)");
  }

  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div>
      <div>
        <div className="relative mt-3 lg:mx-8 rounded-lg">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            navigation={true}
            pagination={type === "achievers" ? { clickable: true } : false}
            autoplay={{
              delay: 8000,
            }}
            keyboard={{
              enabled: true,
            }}
            modules={[Navigation, Keyboard, Pagination, Autoplay]}
            breakpoints={{
              300: {
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
                  {(type === "achievers" || type === "community") ? (
                    <Card
                      shadow={false}
                      className="relative grid w-11/12 lg:w-full min-h-[340px] mx-auto items-end justify-center overflow-hidden cursor-pointer mt-6"
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

                      <CardFooter className="align-bottom absolute z-10 p-5 lg:px-10 lg:py-10 text-left w-full text-white group-hover:opacity-0 transition-opacity duration-300">
                        <Typography className="text-white " variant="h4">
                          {blog?.domain} {blog.title}
                        </Typography>
                        <Typography className="text-gray-300 my-3 " variant="small">
                          {blog.date} •
                          {blog.isCommunity === "false" ? (
                            <>
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
                          </>
                          ) : (
                            <>
                            {(blog.domain?.length && blog.domain.length > 35) && (
                              <><br /><br /></>
                            )}
                              <span className="ms-2 bg-gray-300 opacity-75 text-gray-700 p-1 px-2 rounded-lg">
                                {blog.domain}
                              </span>
                              </>
                          )}
                        </Typography>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card className="my-6 w-5/6 mx-auto h-full">
                      <CardHeader color="blue-gray" className="relative h-56 mt-2">
                        <img
                          src={blog.thumbnail}
                          alt="card-image"
                          className="w-full h-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="h-[230px]">
                        <p className="mb-4 me-2 text-xs text-gray-500">
                          {blog.date} •
                          {blog.isCommunity === "false" ? (
                            <span>
                              <img
                                className="rounded-full flex-shrink-0 mr-2 inline ms-2 mb-2"
                                src="https://tse2.mm.bing.net/th?id=OIP.XadmtOiEEI6Zv388n5l2dQHaHx&pid=Api&P=0&h=220"
                                width="24"
                                height="24"
                                alt="Author 04"
                              />
                              {blog.author}
                            </span>
                          ) : (
                            <>
                            {(blog.domain?.length && blog.domain.length > 35) && (
                              <><br /><br /></>
                            )}
                            <span className="ms-2 mt-2 bg-gray-400 text-white p-1 px-2 rounded-lg">
                              {blog.domain}
                            </span>
                            </>
                          )}
                        </p>

                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className={`mb-2 ${
                            blog.isCommunity === "true" ? "mt-10" : ""
                          }`}
                        >
                          {blog.title}
                        </Typography>
                        <Typography>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                blog.description.length < 100
                                  ? replaceBlackWithWhite(blog.description)
                                  : replaceBlackWithWhite(
                                      blog.description.substring(0, 96) + "..."
                                    ),
                            }}
                          />
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button className="bg-black" onClick={()=>handleBlogClick(blog._id)}>Read More</Button>
                      </CardFooter>
                    </Card>
                  )}
                </SwiperSlide>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CarouselBlog;
