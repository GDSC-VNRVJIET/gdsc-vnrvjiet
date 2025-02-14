import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// Import your page components
import Home from "./pages/Home";
import Signup from "./pages/SignIn";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Blog from "./pages/Events/Blog";
import CarouselBlog from "./pages/Events/CarouselBlog";
import EditBlog from "./pages/Events/user/EditBlog";
import Registration from "./pages/Events/Registration"; // Registration component for hackathon registration
import Contactus from "./pages/Contactus";
import Design from "./pages/Domain Info/Design";
import WebDev from "./pages/Domain Info/WebDev";
import CompetitiveProgramming from "./pages/Domain Info/CompetitiveProgramming";
import ML from "./pages/Domain Info/ML";
import Management from "./pages/Domain Info/Management";
import AppDev from "./pages/Domain Info/AppDev";
import Hardware from "./pages/Domain Info/Hardware";
import WomenInTech from "./pages/Domain Info/WomenInTech";
import TestingCybersecurity from "./pages/Domain Info/TestingCybersecurity";
import CommunityRegistration from "./pages/CommunityRegistration";
import OrgChart from "./pages/OrgChart";
import Forum from "./pages/Forum";
import Team from "./pages/Team";
import SolutionChallenge from "./pages/SolutionChallenge";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import TermsAndConditions from "./pages/TermsandConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import SingleBlog from "./pages/Events/admin/SingleBlog";
import AddBlog from "./pages/Events/admin/AddBlog";

// Leaderboard and ProtectedRoute components
import Leaderboard from "./pages/leaderboard/leaderboard-multiplejurues";
import FinalLeaderboard from "./pages/leaderboard/leaderboard";
import LeaderboardRound2 from "./pages/leaderboard/leaderboard-finalround";
import Enter from "./pages/leaderboard/enter";
import Score from "./pages/leaderboard/score";
import Analysis from "./pages/leaderboard/analysis";
import CheckUsers from "./pages/Events/admin/CheckUsers";
import CheckRegistrations from "./pages/Events/admin/CheckRegistrations";
import GenAiLeaderboard from "./pages/Events/admin/GenAi";
import deniedAccess from "./images/deniedaccess.png";

// Import our EventWindow (handles both workshops and hackathons)
import EventWindow from "./pages/Events/EventWindow";

// Import nested child components for workshops and hackathons
import UpcomingEvents from "./pages/Events/UpcomingEvents";
import PastEvents from "./pages/Events/PastEvents";
import Events from "./pages/Events/Events"; // Parent for workshops
import Hackathons from "./pages/Events/Hackathons"; // Parent for hackathons
import UpcomingHackathons from "./pages/Events/UpcomingHackathons";
import PastHackathons from "./pages/Events/PastHackathons";

// --- Helper Functions for Role Check ---
const isAdmin = (): boolean => {
  const userObj = localStorage.getItem("userObjGDSC");
  if (userObj) {
    const userRole = JSON.parse(userObj);
    return userRole && userRole.role === process.env.REACT_APP_ADMIN_ROLE;
  }
  return false;
};

const isJury = (): boolean => {
  const userObj = localStorage.getItem("userObjGDSC");
  if (userObj) {
    const userRole = JSON.parse(userObj);
    return userRole && userRole.role === process.env.REACT_APP_JURY_ROLE;
  }
  return false;
};

// --- ProtectedRoute Component ---
interface ProtectedRouteProps {
  element: React.ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const navigate = useNavigate();
  if (
    (path === "/leaderboard" ||
      path === "/analysis" ||
      path === "/viewregistrations") &&
    !isAdmin()
  ) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 text-center text-sm md:text-2xl font-bold">
        <p>
          If you're a Jury, you can Evaluate{" "}
          <button
            className="text-blue-500 px-2 hover:underline"
            onClick={() => navigate("/enter")}
          >
            from here.
          </button>
        </p>
        <img className="w-screen" src={deniedAccess} alt="Access Denied" />
      </div>
    );
  } else if ((path === "/enter" || path === "/score") && !isJury()) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 text-center text-sm md:text-2xl font-bold">
        <p>
          If you're an admin, you can access{" "}
          <button
            className="text-blue-500 px-2 hover:underline"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </button>
        </p>
        <img className="w-screen" src={deniedAccess} alt="Access Denied" />
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/blogs" element={<Blog />}>
          <Route index element={<CarouselBlog />} />
          <Route path="achievers" element={<CarouselBlog />} />
          <Route path="community" element={<CarouselBlog />} />
        </Route>
        <Route path="/forum" element={<Forum />} />
        <Route path="/team" element={<Team />} />
        <Route path="/orgchart" element={<OrgChart />} />
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
        <Route path="/app-development" element={<AppDev />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/women-in-tech" element={<WomenInTech />} />
        <Route path="/testing-cybersecutiry" element={<TestingCybersecurity />} />
        <Route path="/community-signup" element={<CommunityRegistration />} />

        {/* The Events section includes nested routes for workshops and hackathons */}
        <Route path="/events" element={<EventWindow />}>
          {/* Workshops nested routes */}
          <Route path="workshops/*" element={<Events />}>
            <Route index element={<Navigate to="upcoming-events" replace />} />
            <Route path="upcoming-events" element={<UpcomingEvents />} />
            <Route path="past-events" element={<PastEvents />} />
          </Route>
          {/* Hackathons nested routes */}
          <Route path="hackathons/*" element={<Hackathons />}>
            <Route index element={<Navigate to="upcoming-hackathons" replace />} />
            <Route path="upcoming-hackathons" element={<UpcomingHackathons />} />
            <Route path="past-hackathons" element={<PastHackathons />} />
          </Route>
        </Route>

        <Route
          path="/viewregistrations/:eventname"
          element={
            <ProtectedRoute element={<CheckRegistrations />} path="/viewregistrations" />
          }
        />
        <Route
          path="/leaderboard"
          element={<ProtectedRoute element={<Leaderboard />} path="/leaderboard" />}
        />
        <Route
          path="/analysis"
          element={<ProtectedRoute element={<Analysis />} path="/analysis" />}
        />
        <Route path="/gen-ai-leaderboard" element={<GenAiLeaderboard />} />
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

        {/* Registration route for hackathon registrations */}
        <Route path="/registration" element={<Registration />} />
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
