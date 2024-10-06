import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Transition from "../utils/Transition";

import UserAvatar from "../images/user-avatar-32.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const signOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
    setDropdownOpen(false);
  };

  const fullName = localStorage.getItem("fullName");
  const roleName = localStorage.getItem("roleName");

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}>
        <div className="w-8 h-8 rounded-full bg-slate-700">
          <div className="mt-1 text-white">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">
            {fullName}
          </span>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0">
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}>
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">{fullName}</div>
            <div className="text-xs text-slate-500 italic">{roleName}</div>
          </div>
          <ul>
            <li className="hidden">
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                Settings
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                onClick={signOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
