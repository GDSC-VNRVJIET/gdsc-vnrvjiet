import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../Apis/users";
import AdminPortalUpcoming from "./admin/Upcoming-AdminPortal";
import UserPortalUpcoming from "./user/Upcoming-UsersPortal";

function UpcomingHackathons() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );
  const { upcomingHackathons } = useOutletContext<{ upcomingHackathons: any[] }>();

  if (user && user.role === process.env.REACT_APP_ADMIN_ROLE) {
    return <AdminPortalUpcoming eventsprop={upcomingHackathons} />;
  } else {
    return <UserPortalUpcoming eventsprop={upcomingHackathons} type="Hackathons" />;
  }
}

export default UpcomingHackathons;
