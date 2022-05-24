import "./template.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav() {
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    getUser(cookies.userId);
  }, []);

  // --------------------- User ---------------------

  const [user, setUser] = useState({});

  const getUser = async (id) => {
    try {
      const user = await fetch(`userId?id=${id}`);
      const data = await user.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  //   -------------------------------------------------
  return (
    <div className="customnav">
      <div className="logo">Manook</div>
      <ul>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
        <li>
          <Link to="/">{user.name}</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
