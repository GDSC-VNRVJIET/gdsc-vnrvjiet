import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CheckUsers from "./pages/Events/admin/CheckUsers";
import EditBlog from "./pages/Events/user/EditBlog";
import Register from "./pages/Events/user/Register";
import Signup from "./pages/SignIn";
import Home from "./pages/Home";
import PastEvents from "./pages/Events/PastEvents";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import Team from "./pages/Team";
import UpcomingEvents from "./pages/Events/UpcomingEvents";
import SolutionChallenge from "./pages/SolutionChallenge";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import Leaderboard from "./pages/leaderboard/leaderboard-multiplejurues";
import FinalLeaderboard from "./pages/leaderboard/leaderboard"
import LeaderboardRound2 from "./pages/leaderboard/leaderboard-finalround"
import Enter from "./pages/leaderboard/enter";
import Score from "./pages/leaderboard/score";
import accessDenied from "./images/accessDenied.png";
import deniedAccess from "./images/deniedaccess.png";
import ForgotPassword from "./pages/ForgotPassword";
import Analysis from "./pages/leaderboard/analysis";
import Blog from "./pages/Events/Blog";
import AddBlog from "./pages/Events/admin/AddBlog";
import Design from "./pages/Domain Info/Design"
import Contactus from "./pages/Contactus";
import TermsAndConditions from "./pages/TermsandConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import SingleBlog from "./pages/Events/admin/SingleBlog";
import WebDev from "./pages/Domain Info/WebDev";
import CompetitiveProgramming from "./pages/Domain Info/CompetitiveProgramming";
import ML from "./pages/Domain Info/ML";
import Management from "./pages/Domain Info/Management";
import Teams from "./pages/leaderboard/Teams";
import Events from "./pages/Events/Events";

const isAdmin = () => {
  const userObjGDSC = localStorage.getItem("userObjGDSC");
  if (userObjGDSC) {
    const userRole = JSON.parse(userObjGDSC);
    return userRole && userRole.role == "admin";
  }
  return false;
};

const isJury = () => {
  const userObjGDSC = localStorage.getItem("userObjGDSC");
  if (userObjGDSC) {
    const userRole = JSON.parse(userObjGDSC);
    return userRole && userRole.role == "jury";
  }
  return false;
};

const ProtectedRoute: React.FC<{ element: React.ReactNode; path: string }> = ({
  element,
  path,
}) => {
  const navigate = useNavigate();
  if ((path == "/leaderboard" || path == "/analysis") && !isAdmin()) {
    return (
      <div className="">
        <div className="inset-0 flex flex-col items-center justify-center pt-10 text-sm md:text-2xl font-bold">
          <p className="text-center">If you're a Jury, you can Evaluate
           <button className="text-blue-500 px-2 hover:underline" onClick={()=>navigate('/enter')}>from here.</button></p>
           <img
          className="w-screen"
          src={deniedAccess}
          alt="Access Denied"
        />
        </div>
      </div>
    );
  } else if ((path == "/enter" || path == "/score") && !isJury()) {
    return (
      <div className="">
      
      <div className="inset-0 flex flex-col items-center justify-center pt-10 text-sm md:text-2xl font-bold">
        <p className="text-center">If you're an admin, you can access 
         <button className="text-blue-500 px-2 hover:underline" onClick={()=>navigate('/leaderboard')}>Leaderboard</button></p>
         <img
        className="w-screen"
        src={deniedAccess}
        alt="Access Denied"
      />
      </div>
    </div>
    );
  } else {
    return <>{element}</>;
  }
};

function Root() {

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin-signup" element={<Signup />} />
        <Route path="/admin-login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="upcoming-events/:eventname" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/forum" element={<Forum />} />
        <Route path="/team" element={<Team />} />
        <Route path="/solution-challenge" element={<SolutionChallenge />} />
        <Route path="/community-guidelines" element={<CommunityGuidelines />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/design" element={<Design />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/blogs/:blogId" element={<SingleBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/web-development" element={<WebDev />} />
        <Route path="/competitive-programming" element={<CompetitiveProgramming />} />
        <Route path="/machine-learning" element={<ML />} />
        <Route path="/management" element={<Management />} />
        <Route path="/events" element={<Events />} >
          <Route path="upcoming-events" element={<UpcomingEvents />} />
          <Route path="past-events" element={<PastEvents />} />
        </Route>
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute element={<Leaderboard />} path="/leaderboard" />
          }
        />
        <Route
          path="/analysis"
          element={<ProtectedRoute element={<Analysis />} path="/analysis" />}
        />
        <Route
          path="/enter"
          element={<ProtectedRoute element={<Enter />} path="/enter" />}
        />
        <Route
          path="/score"
          element={<ProtectedRoute element={<Score />} path="/score" />}
        />
        <Route
          path="/checkuser"
          element={<ProtectedRoute element={<CheckUsers />} path="/checkuser" />}
        />
        
      </Routes>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-up"
          >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      )}
      </>
  );
}

export default Root;
