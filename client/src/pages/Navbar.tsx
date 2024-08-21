import React, { useState, useEffect } from "react";
import GetUserIcon from "./GetUserIcon";
import { getUserById } from "../Apis/users";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [showSignout, setShowSignout] = useState(false);
  const userObjGDSC = localStorage.getItem("userObjGDSC");
  const userId = userObjGDSC ? JSON.parse(userObjGDSC).userId : null;
  const [user, setUser] = useState<{ name: string }>();
  // const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      if (userId) {
        const loggedInUser = await getUserById(userId);
        setUser(loggedInUser.user);
      }
    };
    getData();
  }, [userId]);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );

  const handleLogOut = async () => {
    await localStorage.removeItem("userObjGDSC");
    
    // navigate("/login");
  };

  return (
    <nav
      style={{ zIndex: "10" }}
      className="sticky top-0 bg-white border-b-2 border-slate-300 p-3 mr-4"
    >
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400 ml-auto"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex md:items-center md:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="hidden md:flex md:items-center">
          <NavLink to="/">
            <img
              className="gdsc_logo"
              src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png"
              width="50"
              height="50"
            />
          </NavLink>
        </div>
        <NavLink to="/">
          <h1 className="text-[#868686] text-lg pl-5">GDSC VNRVJIET.</h1>
        </NavLink>
        <div className="flex flex-col md:flex-row ml-auto text-center text-slate-600">
          <div className="relative">
            <button
              className="pl-5 pt-1"
              onClick={() => setDropOpen(!dropOpen)}
            >
              About GDSC <span className="text-lg">&#9662;</span>
            </button>
            {dropOpen && (
              <div
                className="absolute right-0 mt-4 w-max bg-white shadow-lg border-2 border-grey"
                onBlur={() => setDropOpen(false)}
              >
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  About
                </NavLink>
                <NavLink
                  to="/leads"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Leads
                </NavLink>
                <NavLink
                  to="/community-guidelines"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Community Guidelines
                </NavLink>
                <NavLink
                  to="/blogs"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/solution-challenge"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Solution Challenge
                </NavLink>
              </div>
            )}
          </div>
          <button className="pl-5">
            <NavLink to="/">Home</NavLink>
          </button>
          {
            users?.role==="admin" &&
          <button className="pl-5">
            <NavLink to="/enter">Evaluate</NavLink>
          </button>
}
          <button className="pl-5">
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </button>
          <button className="pl-5">
            <NavLink to="/upcoming-events">Upcoming Events</NavLink>
          </button>
          <button className="pl-5">
            <NavLink to="/past-events">Past events</NavLink>
          </button>
          <button className="pl-5">
            <NavLink to="/Forum">Forum</NavLink>
          </button>
          <button className="pl-5">
            <NavLink to="/contact-us">Contact Us</NavLink>
          </button>
          {userObjGDSC == null ? (
            <button className="pl-5 relative">
              <NavLink to="/login">Login</NavLink>
            </button>
          ) : (
            <div className="relative">
              {" "}
              <button
                className="pl-5 pr-10"
                onClick={() => setShowSignout((prevState) => !prevState)}
              >
                <GetUserIcon user={user} />
                {showSignout && user && (
                  <div className="border w-[100px] rounded-lg absolute bg-white mt-1 p-1">
                    <div className="font-bold">{user.name}</div>
                    <button
                      className="bg-red-600 text-sm text-white font-bold w-fit p-1 m-1 rounded-md hover:ring ring-red-400 ring-offset-2 transition"
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
