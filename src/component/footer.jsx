import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTiktok } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { userContext } from "../App";

function Footer () {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false
          },
          "google_translate_element"
        );
      };
      useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
          "src",
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);
  
  return (
   
   <>
<footer class="footer">
    <div class="container mx-auto p-4 md:py-8 ">
        <div class="flex items-center justify-center">
        <Link to="/" class=" lg:block">
            <div
              to="/picks-analysis2"
              className="  sm:ms-0 aspect-auto flex items-center justify-center cursor-pointer"
            >
              <img src="/logo-img.png" className="baddie-logo" />
            </div>
          </Link>

          </div>

            <ul className="flex justify-center m-6 social_links">
                <li className="me-6">
                    <Link to="https://www.instagram.com/baddie_sports">
                    <FiInstagram />
                    </Link>
                    </li>
                    <li className="me-6">
                    <Link to="https://www.tiktok.com/@baddie_sports">
                    <IoLogoTiktok />
                    </Link>
                    </li>
                    <li>
                    <Link to="https://twitter.com/baddie_sports">
                    <FaSquareXTwitter />
                    </Link>
                </li>
            </ul>
     
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 divider" />
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="copyright">Lovingly crafted by
        <Link href="/" className="hover:underline"> Baddie Sports LLC</Link>. All Rights Reserved.</span>

        <div id="google_translate_element"></div>

            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0 footer-menu">
                <li>
                <Link to="/" className="hover:underline me-4 md:me-6"> Privacy Policy</Link>
                </li>
            </ul>
    </div>

       
    </div>
</footer>
   </>
  
  );
}

export default Footer;
