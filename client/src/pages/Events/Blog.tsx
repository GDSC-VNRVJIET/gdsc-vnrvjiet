import React ,{useState} from 'react'
import AdminShowBlogs from './admin/AdminShowBlogs';
import UserShowBlogs from './user/UserShowBlogs';
function Blog() {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
          role: string;
        } | null
      );

      if (user && user.role === "admin") {
        return <AdminShowBlogs/>;
      } else {
        return <UserShowBlogs />;
      }
}

export default Blog