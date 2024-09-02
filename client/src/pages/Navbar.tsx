import React, { useState, useEffect } from "react";
import GetUserIcon from "./GetUserIcon";
import { getUserById } from "../Apis/users";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [showSignout, setShowSignout] = useState(false);
  const userObjGDSC = localStorage.getItem("userObjGDSC");
  const userId = userObjGDSC ? JSON.parse(userObjGDSC).userId : null;
  const [user, setUser] = useState<{ name: string }>();
  const navigate = useNavigate();
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
    localStorage.removeItem("userObjGDSC");
    
    navigate("/");
  };
  const handleNavClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      style={{ zIndex: "10" }}
      className="sticky top-0 bg-transparent backdrop-blur-lg bg-opacity-30 z-50 p-4 shadow-md"
    >
      <div className="flex items-center block md:hidden">
      <NavLink to="/">
            <img
              className="gdsc_logo transition-transform duration-500 transform hover:scale-110"
              src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png"
              width="50"
              height="50"
            />
        </NavLink>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400  w-50 ml-auto "
        >
         <svg
              className={`fill-current h-6 w-6 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-90' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d={isOpen ? "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" : "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"} />
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
              className="gdsc_logo transition-transform duration-500 transform hover:scale-110"
              src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png"
              width="50"
              height="50"
            />
          </NavLink>
        </div>
        <NavLink to="/">
          <h1 className="text-[#868686] text-lg pl-5 hidden md:block transition-all duration-500 ease-in-out hover:text-transparent hover:bg-clip-text  hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:via-green-500 hover:to-blue-500 hover:tracking-wider hover:scale-110">GDSC VNRVJIET</h1>
        </NavLink>
        <div className="flex flex-col md:flex-row ml-auto text-center text-slate-600 ">
        <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white  ">
          <NavLink to="/" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-blue-500 text-white" : ""}`}>
          <span className="absolute inset-0 group-hover:bg-blue-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
          <span className="relative">Home</span>
        </NavLink>
        </button>
          {/* <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/team" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-blue-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-blue-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Team </span>
            </NavLink>
          </button> */}
          <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/orgchart" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-red-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-red-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">OrgChart </span>
            </NavLink>
          </button>
          <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/blogs" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-red-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-red-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Blogs</span>
            </NavLink>
          </button>
          <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/solution-challenge" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-yellow-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-yellow-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Solution Challenge</span>
            </NavLink>
          </button>
          {/* {
            users?.role==="admin" &&
            <button className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
              <NavLink to="/enter" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-yellow-500 text-white" : ""}`}>
              <span className="absolute inset-0 group-hover:bg-yellow-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
              <span className="relative">Evaluate</span>
              </NavLink>
            </button>
          } */}
          {/* <button className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/leaderboard" className="relative z-10">Leaderboard
            <span className="absolute inset-0 group-hover:bg-yellow-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
          </button> */}
          <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/events" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-green-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-green-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Events</span>
            </NavLink>
          </button>
          <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/Forum" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-green-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-green-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Forum</span>
            </NavLink>
          </button>
          <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="/contact-us" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-blue-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-blue-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Contact Us</span>
            </NavLink>
          </button>
          {/* {userObjGDSC == null ? (
            <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
              <NavLink to="/login" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-red-500 text-white" : ""}`}>
              <span className="absolute inset-0 group-hover:bg-red-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
              <span className="relative">Login</span>
              </NavLink>
            </button>
          ) : (
            <div className="relative">
              <button
                className="flex items-center pl-5 pr-10 py-2"
                onClick={() => setShowSignout((prevState) => !prevState)}
              >
                <GetUserIcon user={user}/>
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
          )} */}
          <button onClick={handleNavClick} className="relative mx-3 py-2 overflow-hidden rounded-lg group hover:text-white ">
            <NavLink to="https://gdsc.community.dev/vallurupalli-nageswara-rao-vignana-jyothi-institute-of-engineering-and-technology-hyderabad-india/" className={({ isActive }) =>`relative z-10 block px-4 py-2 overflow-hidden rounded-full  ${isActive ? "bg-red-500 text-white" : ""}`}>
            <span className="absolute inset-0 group-hover:bg-red-500 transform -translate-x-full rounded-lg transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            <span className="relative">Join us</span>
            </NavLink>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
