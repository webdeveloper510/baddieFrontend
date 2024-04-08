import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { userContext } from "../App";

const Header = ({ show, setShow }) => {
  const {user,setUser} = useContext(userContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLogin, setIsLogin] = useState("true");

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {

    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate()
  const dropdownRef = useRef()
  const toggleDropdown = (e) => {
    e.preventDefault()
    setDropdownOpen(prev=>!prev);
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
  return (
   
    <div className="w-full bg-lightblack">
      <div class="">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div class="space-x-2">
            <span onClick={() => setShow(!show)}>
              <div className="aspect-auto cursor-pointer ">
                <h1 className="b-logo">B</h1>
              </div>
            </span>
          </div>
          <div>
          <Link to="/" class=" lg:block">
            <div
              to="/picks-analysis2"
              className=" md:ms-20 sm:ms-0 aspect-auto flex items-center justify-center cursor-pointer py-2"
            >
              <img src="/logo-img.png" className="baddie-logo" />
            </div>
          </Link>
          </div>

          <div >
            {user ? (
              
                <button
                  id="dropdownInformationButton"
                  onClick={toggleDropdown}
                  className="text-white user-section aspect-square md:w-16 sm:w-8  text-center text-sm rounded-full bg-greyLight"
                  type="button"
                >
                  {`${user?.firstname?.charAt(0)?.toUpperCase()} ${user?.lastname?.charAt(0)?.toUpperCase()}`}
                </button>
              
            ) : (
              <>
                <Link to="/signin">
                <button  className="text-black  bg-lightgray py-1 text-lg rounded w-40 login-sign mt-4">
                  login
                </button>
                </Link>
                <br />
                <Link to="/signup"><button className="text-black  bg-lightgray py-1 text-lg rounded w-40 login-sign my-2">
                  signup
                </button></Link>
              </>
            )}

            {isDropdownOpen && (
              <div
              onClick={()=>{
                setDropdownOpen(false);
              }}
                ref={dropdownRef}
                id="dropdownInformation"
                className="z-20 absolute right-2 bg-white  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                
              >
                <div className="bg-white px-4 py-3 text-sm text-gray-900 text-black">
                  <div>{`${user?.firstname} ${user?.lastname}`}</div>
                  <div className="font-medium truncate">{user?.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                    >
                      Reset Password
                    </a>
                  </li>
                  {user?.status != "active" && <li>
                    <Link
                      to="/payment"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                    >
                      Buy Subscription
                    </Link>
                  </li>}
                  {user?.status === "active" && <li>
                    <Link
                      to={user?.status == "active"?"/plan":"/payment"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                    >
                      Plan
                    </Link>
                  </li>}
                  {/* <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 "
                    >
                      Earnings
                    </a>
                  </li> */}
                </ul>
                <div className="py-2">
                  <button
                  onClick={()=>{
                    localStorage.clear();
                    setUser(null)
                    navigate("/signin");

                  }}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 "
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
  
  );
};

export default Header;
