import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../Apis/users";
import AdminPortalUpcoming from "./admin/Upcoming-AdminPortal";
import UserPortalUpcoming from "./user/Upcoming-UsersPortal";

function UpcomingEvents() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );
  const { upcomingEvents } = useOutletContext<{ upcomingEvents: any[] }>();
  console.log(user)
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!user) {
  //       try {
  //         const userId = localStorage.getItem("userIdGDSC");
  //         const fetchedUser = await getUserById(userId);
  //         setUser(fetchedUser);
  //       } catch (error) {
  //         console.error("Error fetching user:", error);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, [user]);

  

  if (user && user.role === "admin") {
    return <AdminPortalUpcoming eventsprop={upcomingEvents}/>;
  } else {
    return <UserPortalUpcoming eventsprop={upcomingEvents} />;
  }
}

export default UpcomingEvents;
