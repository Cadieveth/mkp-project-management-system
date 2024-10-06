import React, { useState, useEffect } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import "./../components/styleComponent/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="top-to-btm">
      {" "}
      {showTopBtn && (
        <Button type="primary" iconName={faAngleUp} text="Add Data" />
      )}{" "}
    </div>
  );
};
export default ScrollToTop;
