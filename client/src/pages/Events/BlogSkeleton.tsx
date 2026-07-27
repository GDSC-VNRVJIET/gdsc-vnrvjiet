import React from "react";

const BlogSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse p-6 space-y-6">
      <div className="flex flex-wrap gap-4 items-center mb-8">
        <div className="h-12 w-44 rounded-full bg-gray-200" />
        <div className="h-12 w-48 rounded-full bg-gray-200" />
        <div className="h-12 w-32 rounded-full bg-gray-200" />
      </div>

      <div className="grid gap-[60px] lg:grid-cols-2 xl:grid-cols-3 p-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="h-56 w-full rounded-2xl bg-gray-200" />
            <div className="mt-6 space-y-4">
              <div className="h-6 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="flex items-center justify-between pt-4">
                <div className="h-10 w-28 rounded-full bg-gray-200" />
                <div className="h-10 w-10 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
