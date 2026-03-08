import React from "react";

function GlassCard({ profileImage, personRole, personName, bgColor }: any) {
  return (
    <div
      className="border-2 relative
      transition-all duration-300 hover:-translate-y-1 hover:shadow-sm
      w-full max-w-[300px]
      flex flex-col items-center
      py-8 px-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-black text-center">

        <img
          src={profileImage}
          alt={personRole}
          className="w-[170px] h-[170px] object-cover"
        />

        <h2
          className="text-lg font-semibold mt-4"
          style={{ fontFamily: '"Google Sans", sans-serif' }}
        >
          {personName}
        </h2>

        <p
          className="text-sm text-gray-500"
          style={{ fontFamily: '"Google Sans", sans-serif' }}
        >
          {personRole}
        </p>

      </div>

      {/* Corner Plus Icons */}

      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
        className="absolute h-6 w-6 -top-3 -left-3 text-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
        className="absolute h-6 w-6 -bottom-3 -left-3 text-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
        className="absolute h-6 w-6 -top-3 -right-3 text-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
        className="absolute h-6 w-6 -bottom-3 -right-3 text-black">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

    </div>
  );
}

export default GlassCard;