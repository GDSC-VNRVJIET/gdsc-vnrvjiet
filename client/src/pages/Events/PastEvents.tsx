import React, { useEffect, useState } from "react";
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

  if (user && user.role == "admin") {
    return <AdminPortalPast />;
  } else {
    return <UserPortalPast />;
  }
}

export default PastEvents;
