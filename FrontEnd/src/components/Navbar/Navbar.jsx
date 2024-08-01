import { useEffect, useState } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { ExpandMoreIcon } from "../icons";
import { ImageApi } from "../../api/image";
import { logout, isLogin, getProfile } from "../../utils/localstorage";

function Navbar({ loading }) {
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    setLoggedin(isLogin());
    if (isLogin()) {
      setProfile(getProfile());
      console.log(profile);
    }
  }, [loading]);

  // decode token to get user information

  const handleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const sidebarButton = document.getElementById("sidebarbutton");

    if (sidebar.getAttribute("aria-expanded") === "false") {
      sidebar.setAttribute("aria-expanded", "true");
      sidebarButton.setAttribute("aria-expanded", "true");
    } else {
      sidebar.setAttribute("aria-expanded", "false");
      sidebarButton.setAttribute("aria-expanded", "false");
    }
  };

  return (
    <>
      <header className="header-section">
        <div className="container">
          <div className="logo">NestNavigator</div>
          <button
            id="sidebarbutton"
            aria-expanded="false"
            onClick={handleSidebar}
          ></button>

          <nav className="navbar">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/buyproperty">Buy Property</NavLink>
              </li>
              <li>
                <NavLink to="/rentproperty">Rent Property</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>

              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
            </ul>
          </nav>
          <div className="sign-up">
            {loggedin ? (
              <div className="user-profile-container">
                <div className="image-content">
                  <img
                    src={
                      profile.image === "null"
                        ? "/profile.png"
                        : ImageApi.GetStaticProfileImage(profile.image)
                    }
                    alt="profile"
                  />
                </div>

                <div className="dropdown-content">
                  <p>{profile.username}</p>
                  <NavLink to="/dashboard/userprofile">Profile</NavLink>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <a
                    onClick={() => {
                      logout();
                      window.location.reload();
                    }}
                  >
                    Sign Out
                  </a>
                </div>
              </div>
            ) : (
              <li>
                <NavLink to="signin">Sign In</NavLink>
              </li>
            )}
          </div>

          <div id="sidebar" className="sidebar" aria-expanded="false">
            <div className="user-profile-container">
              <div
                className="main-container"
                onClick={() => setProfileExpanded(!profileExpanded)}
              >
                <div className="image-content">
                  <img
                    src={
                      profile.image === "null"
                        ? "/profile.png"
                        : ImageApi.GetStaticProfileImage(profile.image)
                    }
                    alt="profile"
                  />
                </div>
                <div className="menu-content">
                  <p>My account</p>
                  <div
                    className={`expanded-svg ${profileExpanded ? "rotated" : ""}`}
                  >
                    <ExpandMoreIcon />
                  </div>
                </div>
              </div>
              <div className="profile-navigations">
                <div
                  className={`profile-links ${profileExpanded ? "expanded" : ""}`}
                >
                  <ul>
                    <li>
                      <NavLink to="/dashboard/userprofile">Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                      <a onClick={null}>Sign Out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <ul className="sidebar-navigation" id="sidebar-links">
              <li className="sidebar-item">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to={"/buyproperty"}>Buy Property</NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to={"/rentproperty"}>Rent Property</NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to={"/about"}>About Us</NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to={"/services"}>Services</NavLink>
              </li>
              {!loggedin && (
                <li className="sidebar-item">
                  <NavLink to={"/signin"}>Sign In</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
