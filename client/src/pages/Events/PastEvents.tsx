import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../Apis/users";
import AdminPortalPast from "./admin/Past-AdminPortal";
import UserPortalPast from "./user/Past-UsersPortal";

function PastEvents() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );
  const { pastEvents } = useOutletContext<{ pastEvents: any[] }>();

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

  if (user && user.role == process.env.REACT_APP_ADMIN_ROLE) {
    return <AdminPortalPast eventsprop={pastEvents}/>;
  } else {
    return <UserPortalPast eventsprop={pastEvents}/>;
  }
}

export default PastEvents;
