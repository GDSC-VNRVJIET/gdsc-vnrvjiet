import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../Apis/users";
import AdminPortalPast from "./admin/Past-AdminPortal";
import UserPortalPast from "./user/Past-UsersPortal";
import { TbBulb } from "react-icons/tb";

function PastHackathons() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );
  const { pastHackathons } = useOutletContext<{ pastHackathons: any[] }>();

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
  //
  //   fetchUser();
  // }, [user]);

  if (user && user.role === process.env.REACT_APP_ADMIN_ROLE) {
    return <AdminPortalPast eventsprop={pastHackathons} />;
  } else {
    return (
      <>
        <div className="flex justify-center">
          <span className="flex whitespace-nowrap rounded-full bg-neutral-800 p-2 mx-auto text-center align-baseline text-md font-bold leading-none text-zinc-100 dark:bg-neutral-800">
            <p className="mt-1">Click / Hover </p>
            <TbBulb className="ml-1" style={{ fontSize: "1.5rem" }} />
          </span>
        </div>
        <UserPortalPast eventsprop={pastHackathons} type="Hackathons" />
      </>
    );
  }
}

export default PastHackathons;
