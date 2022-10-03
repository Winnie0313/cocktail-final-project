import React from "react";
import "./Styles-login-reg.css";

import { BsFacebook, BsTwitter, BsGithub } from "react-icons/bs";
import { FaCocktail } from "react-icons/fa";

function Footer() {
  return (
    <div className="foooter">
      <footer className="footer mt-auto py-2 bg-dark text-white">
        <div className="footerr">
          <div>
            <FaCocktail size="2rem" />
          </div>
          <div className="text-center copyright p-3">© 2022 Copyright</div>
          <div className="icons">
            <a href="https://www.facebook.com/" className="me-2 text-reset">
              <BsFacebook className="footer-icons" size="2em" color="white" />
            </a>
            <a href="https://twitter.com/home" className="me-2 text-reset">
              <BsTwitter size="2em" color="white" />
            </a>
            <a href="https://github.com/" className="me-2 text-reset">
              <BsGithub size="2em" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
