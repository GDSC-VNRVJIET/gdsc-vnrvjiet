import React from 'react';
import { useLocation } from 'react-router-dom';

interface BlogState {
  title: string;
  thumbnail: string;
  authorname: string;
  category: string;
  description: string;
}

const SingleBlog: React.FC = () => {
  const location = useLocation();
  const state = location.state as BlogState;

  if (!state) {
    return <div>No blog data available</div>;
  }

  return (
    <div>
      <article className="w-3/4 mx-auto my-8 p-9 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-4">{state.title}</h2>
        <img src={state.thumbnail} alt="" className="rounded-md mb-4 w-full max-h-[450px] object-cover" />

        <div className="flex items-center space-x-2">
          {/*<img src="author-photo.jpg" alt="" className="w-10 h-10 rounded-full" />*/}
          <span className="font-medium">by {state.authorname}</span>
          <span className="text-gray-400">• in {state.category}</span>
        </div>
        <hr className="my-6 border-t-2 border-gray-200" />
        <p className="mb-4 text-gray-600" dangerouslySetInnerHTML={{ __html: state.description }}></p>
      </article>
    </div>
  );
};

export default SingleBlog;
