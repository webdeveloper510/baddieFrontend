import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuItem } from "react-pro-sidebar";
import { CiMenuFries } from "react-icons/ci";
import { X } from "lucide-react";
import { userContext } from "../App";
import { emailNotification } from "../api";

const Header = ({ show, setShow }) => {
  const { user, setUser } = useContext(userContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLogin, setIsLogin] = useState("true");

  console.log("useruseruser", user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const emailnotifiUpdate = (value) => {
    emailNotification({ email_notification: value })
      .then((res) => {
        setUser(res?.data)
        console.log("email_notification",res);
        setDropdownOpen((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const dropdownRef = useRef();
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen((prev) => !prev);
  };
  // useEffect(()=>{
  //   window.addEventListener('click',(e)=>{
  //     if(!dropdownRef?.current?.contains(e?.target)){
  //       setDropdownOpen((prev)=>{
  //         console.log("prev",prev)
  //         if(prev)return false;
  //         return prev
  //       });
  //       console.log("click oustide")
  //     }
  //   })
  // },[])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full header_bg">
      <div class="container top_header">
        <div class="flex items-center justify-between">
          <div className="col">
            <div class="space-x-2 mobile-toggle-btn">
              <span onClick={() => setShow(!show)}>
                <CiMenuFries />
              </span>
            </div>

            <Link to="/" class=" lg:block mobile-logo-hide">
              <div
                to="/picks-analysis2"
                className="  sm:ms-0 aspect-auto flex items-center justify-center cursor-pointer"
              >
                <img src="/logo-img.png" className="baddie-logo" />
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/" class=" lg:block mobile-logo">
              <div
                to="/picks-analysis2"
                className="  sm:ms-0 aspect-auto flex items-center justify-center cursor-pointer"
              >
                <img src="/logo-img.png" className="baddie-logo" />
              </div>
            </Link>

            <Menu className="menubar">
              <div className="">
                {user && user?.is_admin ? (
                  <>
                    <Link to={"/admin-dashboard"}>
                      <MenuItem
                        className={`font-semibold text-center hover:text-black hover:white ${
                          location.pathname.includes("admin-dashboard")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        Dashboard
                      </MenuItem>
                    </Link>
                    <Link to={"/user-list"}>
                      <MenuItem
                        className={`font-semibold text-center hover:text-black hover:white ${
                          location.pathname.includes("user-list")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        Users
                      </MenuItem>
                    </Link>
                    <Link to={"/transaction-list"}>
                      <MenuItem
                        className={`font-semibold text-center hover:text-black hover:white ${
                          location.pathname.includes("transaction-list")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        Transaction
                      </MenuItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/picks-analysis">
                      <MenuItem
                        className={`font-semibold mx-3 text-center hover:text-black hover:white ${
                          location.pathname.includes("picks-analysis")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        Picks & analysis
                      </MenuItem>
                    </Link>
                    <Link to={user?.status == "active" ? "/dam" : "/payment"}>
                      <MenuItem
                        className={`mx-3 font-semibold text-center hover:text-black hover:white ${
                          location.pathname.includes("dam")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        DAM
                      </MenuItem>
                    </Link>
                    {/* <Link to="/matchup"><MenuItem className={`font-semibold text-center hover:text-black hover:white ${location.pathname.includes("matchup") ? "bg-white text-black active" : "bg-greyLight text-white"} `}>
                                 DAM
                             </MenuItem>
                             </Link> */}

                    <Link
                      to={user?.status == "active" ? "/new-eda" : "/payment"}
                    >
                      <MenuItem
                        className={`mx-3 font-semibold text-center hover:text-black hover:white ${
                          location.pathname.includes("new-eda")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        Player/team EDA
                      </MenuItem>
                    </Link>
                    <Link
                      to={
                        user?.status == "active"
                          ? "/expected-value"
                          : "/payment"
                      }
                    >
                      <MenuItem
                        className={`mx-3 font-semibold text-center hover:text-black hover:white ${
                          location.pathname.includes("expected-value")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        EV calculator
                      </MenuItem>
                    </Link>

                    <Link to={user?.status == "active" ? "/al-ml" : "/payment"}>
                      <MenuItem
                        className={`mx-3 font-semibold text-center hover:text-black hover:white ${
                          location.pathname.includes("al-ml")
                            ? "bg-white text-black active"
                            : "bg-greyLight text-white"
                        } `}
                      >
                        AI & ML
                      </MenuItem>
                    </Link>
                  </>
                )}
              </div>
              <></>
            </Menu>
          </div>

          <div className="col">
            <div className="flex action_btn">
              {user ? (
                <button
                  id="dropdownInformationButton"
                  onClick={toggleDropdown}
                  className="text-white user-section aspect-square md:w-16 sm:w-8  text-center text-sm rounded-full bg-greyLight"
                  type="button"
                >
                  {`${user?.firstname
                    ?.charAt(0)
                    ?.toUpperCase()} ${user?.lastname
                    ?.charAt(0)
                    ?.toUpperCase()}`}
                </button>
              ) : (
                <>
                  <Link to="/signin">
                    <button className="text-black  bg-lightgray text-lg  w-40 login-sign">
                      login
                    </button>
                  </Link>
                  <br />
                  <Link to="/signup">
                    <button className="text-black  bg-lightgray text-lg  w-40 login-sign sign-up">
                      signup
                    </button>
                  </Link>
                </>
              )}

              {isDropdownOpen && (
                <div
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                  ref={dropdownRef}
                  id="dropdownInformation"
                  className="z-20 absolute right-2 bg-white  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div className=" px-4 py-3 text-sm text-gray-900 text-black">
                    <div className="u_name">{`${user?.firstname} ${user?.lastname}`}</div>
                    <div className="font-medium truncate">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 reset flex link_pass">
                    <li>
                      <Link
                        to="/change-password"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                      >
                        Reset Password
                      </Link>
                    </li>

                    {!user.is_admin && user?.status != "active" && (
                      <li>
                        <Link
                          to="/payment"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                        >
                          Buy Subscription
                        </Link>
                      </li>
                    )}
                    {!user.is_admin && user?.status === "active" && (
                      <li>
                        <Link
                          to={user?.status == "active" ? "/plan" : "/payment"}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                        >
                          Plan
                        </Link>
                      </li>
                    )}
                    {/* <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                    >
                      Earnings
                    </a>
                  </li> */}
                  </ul>
                  <div className="pt-2">
                    <p className="flex px-3 items-center justify-between text-white email_notify">Email Notification {user?.email_notification == true ? (
                      <svg
                      onClick={()=>emailnotifiUpdate(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="30"
                        fill="currentColor"
                        className="bi bi-toggle2-on text-[green]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 5H3a3 3 0 0 0 0 6h4a5 5 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416q.235-.537.584-1" />
                        <path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0" />
                      </svg>
                    ) : (
                      <svg
                        onClick={()=>emailnotifiUpdate(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="30"
                        fill="currentColor"
                        class="bi bi-toggle2-off text-[red]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9 11c.628-.836 1-1.874 1-3a4.98 4.98 0 0 0-1-3h4a3 3 0 1 1 0 6z" />
                        <path d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10" />
                      </svg>
                    )}</p>
                  </div>
                  <div className="py-2 out_rest">
                    <button
                      onClick={() => {
                        localStorage.clear();
                        setUser(null);
                        navigate("/signin");
                      }}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 user_out"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
