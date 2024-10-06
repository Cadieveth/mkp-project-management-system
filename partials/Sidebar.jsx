import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";
import LogoMkp from "../images/logo-mkp.png";

import "~bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faCubes,
  faEye,
  faCartShopping,
  faUsers,
  faChartSimple,
  faSitemap,
  faListCheck,
  faMessage,
  faInbox,
  faCalendar,
  faCircleNodes,
  faGears,
  faLayerGroup,
  faRightToBracket,
  faShuffle,
  faCodeBranch,
  faDiagramProject,
  faBoxesPacking,
  faBriefcase,
  faUser,
  faDiceFour,
  faBarsStaggered,
  faCodeMerge,
  faNetworkWired,
  faPieChart,
  faShieldHalved,
  faHand,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [isHovered, setIsHovered] = useState(false);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-full ${
          sidebarOpen
            ? "lg:sidebar-expanded:!w-full"
            : "lg:sidebar-expanded:!w-24"
        } 2xl:!w-full shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }  ${isHovered ? "lg:sidebar-expanded:!w-full" : ""} `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Sidebar header */}
        <div className="flex justify-between mb-5 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}>
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            {/* <svg width="32" height="32" viewBox="0 0 32 32"> */}

            <div className="flex justify-between">
              <div className="flex items-center mt-3">
                <img
                  src={LogoMkp}
                  alt="Logo MKP"
                  width={"30"}
                  height={"30"}
                  className="ml-2"
                />
                <div className={sidebarOpen ? "ml-4 mr-2" : "ml-9 mr-2"}>
                  {" "}
                  <h5
                    className={
                      sidebarOpen
                        ? "text-[9px] text-slate-20 font-bold text-white"
                        : "text-sm text-slate-20 font-bold text-white"
                    }>
                    MKP Management System
                  </h5>
                  <h1
                    className={
                      sidebarOpen
                        ? "text-[7px] text-white"
                        : "text-[8px] text-white"
                    }>
                    The Most Reliable Traffic Intelligence Company
                  </h1>
                </div>
              </div>
              {/* Expand / collapse button */}
              <div
                className={
                  sidebarOpen
                    ? "hidden"
                    : "text-slate-300 hover:text-white flex justify-end ml-1"
                }>
                <div id="button" className="px-1 ml-5 mt-5">
                  <div className="mt-0.5">
                    <button
                      onClick={() => setSidebarExpanded(!sidebarExpanded)}
                      className={`hover:${
                        isHovered
                          ? "lg:sidebar-expanded:!w-full"
                          : "lg:sidebar-expanded:!w-24"
                      }`}>
                      <span className="sr-only">Expand / collapse sidebar</span>
                      {sidebarExpanded ? (
                        <svg
                          className="w-4 h-4 -ml-3 !sidebar-expanded:rotate-180"
                          viewBox="-2.4 -2.4 28.80 28.80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(0)">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="#d4dae6"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 -ml-3 !sidebar-expanded:rotate-180"
                          viewBox="-2.4 -2.4 28.80 28.80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(0)"
                          stroke="#d4dae6">
                          <g
                            id="SVGRepo_bgCarrier"
                            stroke-width="0"
                            transform="translate(8.4,8.4), scale(0.3)">
                            <rect
                              x="-2.4"
                              y="-2.4"
                              width="28.80"
                              height="28.80"
                              rx="14.4"
                              fill="#d4dae6"
                              strokewidth="0"></rect>
                          </g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="#d4dae6"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"></path>{" "}
                          </g>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* </svg> */}
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Main Dashboard */}
          <div>
            <ul className="mt-3">
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  (pathname === "/" || pathname.includes("dashboard")) &&
                  "bg-slate-900"
                }`}>
                <NavLink
                  to="/"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    (pathname === "/" || pathname.includes("dashboard")) &&
                    "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faPieChart}
                          className="text-xl mr-2"
                        />
                      </div>

                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Master Group */}
          <div>
            <h3 className="text-xs uppercase text-slate-100 font-semibold pl-3">
              <span className="lg:sidebar-expanded:block 2xl:block">
                Master
              </span>
            </h3>
            <ul className="mt-3">
              {/* Package Category */}
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  pathname.includes("package-category") && "bg-gray-900"
                }`}>
                <NavLink
                  end
                  to="/package-category"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    pathname.includes("package-category") &&
                    "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faBoxesPacking}
                          className="text-xl mr-2"
                        />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Product Category
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Business Category */}
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  pathname.includes("business-category") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to="/business-category"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    pathname.includes("business-category") &&
                    "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-xl mr-2"
                        />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Business Category
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Account */}
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  pathname.includes("account") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to="/account"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    pathname.includes("account") && "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-xl mr-2"
                        />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Account
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Probability */}
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  pathname.includes("probability") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to="/probability"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    pathname.includes("probability") && "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faDiceFour}
                          className="text-xl mr-2"
                        />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Probability
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Sales Stage */}
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  pathname.includes("sales-stage") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to="/sales-stage"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    pathname.includes("sales-stage") && "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faBarsStaggered}
                          className="text-xl mr-2"
                        />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Sales Stage
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Division */}
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  pathname.includes("division") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to="/division"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    pathname.includes("division") && "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faNetworkWired}
                          className="text-xl mr-2"
                        />
                      </div>
                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Division
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* PTMS Group */}
          <div>
            <h3 className="text-xs uppercase text-slate-100 font-semibold pl-3">
              <span className="lg:sidebar-expanded:block 2xl:block">PTMS</span>
            </h3>
            <ul className="mt-3">
              {/* Sprint */}
              <li
                className={`px-3 py-2 rounded-2xl mb-0.5 last:mb-0 ${
                  pathname.includes("sprint" || "survey") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to="/sprint"
                  className={`block text-slate-300 hover:text-white truncate transition duration-150 ${
                    pathname.includes("sprint") && "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <div className="w-8">
                        <FontAwesomeIcon
                          icon={faCircleNodes}
                          className="text-xl mr-2"
                        />
                      </div>

                      <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Sprint
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Components */}
          {/* <SidebarLinkGroup activecondition={pathname.includes("component")}>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <a
                    href="#0"
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes("component") && "hover:text-slate-200"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCodeBranch}
                          className="text-xl mr-2"
                        />
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Components
                        </span>
                      </div>
                      <div className="flex shrink-0 ml-2">
                        <svg
                          className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                            open && "rotate-180"
                          }`}
                          viewBox="0 0 12 12">
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/button"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Button
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/form"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Input Form
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/dropdown"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Dropdown
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/alert"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Alert & Banner
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/modal"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Modal
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/pagination"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Pagination
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/tabs"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Tabs
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/breadcrumb"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Breadcrumb
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/badge"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Badge
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/avatar"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Avatar
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/tooltip"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Tooltip
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/accordion"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Accordion
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/component/icons"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Icons
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup> */}
        </div>

        <div>
          {/* Pages group */}
          {/* <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-0"> */}

          {/* E-Commerce */}
          {/* <SidebarLinkGroup
                activecondition={pathname.includes("ecommerce")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("ecommerce") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              className="text-xl mr-2"
                            />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              E-Commerce
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/ecommerce/customers"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Customers
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/ecommerce/orders"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Orders
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/ecommerce/invoices"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Invoices
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/ecommerce/shop"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Shop
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}

          {/* Settings */}
          {/* <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("settings") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faGears}
                              className="text-xl mr-2"
                            />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Settings
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/settings/account"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                My Account
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/settings/notifications"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                My Notifications
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/settings/apps"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Connected Apps
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/settings/plans"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Plans
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/settings/billing"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Billing & Invoices
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/settings/feedback"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Give Feedback
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}

          {/* Utility */}
          {/* <SidebarLinkGroup activecondition={pathname.includes("utility")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("utility") && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faLayerGroup}
                              className="text-xl mr-2"
                            />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Utility
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/utility/changelog"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Changelog
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/utility/roadmap"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Roadmap
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/utility/faqs"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                FAQs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/utility/empty-state"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Empty State
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/utility/404"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                404
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/utility/knowledge-base"
                              className={({ isActive }) =>
                                "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                (isActive ? "!text-indigo-500" : "")
                              }>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Knowledge Base
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div> */}

          {/* Old NANTI APUS, li dari PTMS */}
          {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("sprint-modul") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to="/sprint-modul"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("sprint-modul") && "hover:text-slate-200"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <FontAwesomeIcon
                        icon={faCircleNodes}
                        className="text-xl mr-2"
                      />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Sprint Template Modul
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li> */}

          {/* More group */}
          {/* <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                More
              </span>
            </h3>
            <ul className="mt-3"> */}
          {/* Authentication */}
          {/* <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          open && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faRightToBracket}
                              className="text-xl mr-2"
                            />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Authentication
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/signin"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign in
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/signup"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign up
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/reset-password"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Reset Password
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div> */}

          {/* Onboarding */}
          {/* <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          open && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faShuffle}
                              className="text-xl mr-2"
                            />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Onboarding
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/onboarding-01"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 1
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/onboarding-02"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 2
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/onboarding-03"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 3
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/onboarding-04"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 4
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}

          {/* Dashboard */}
          {/* <SidebarLinkGroup
            activecondition={
              pathname === "/" || pathname.includes("dashboard")
            }>
            {(handleClick, open) => {
              return (
                <React.Fragment>
                  <a
                    href="#0"
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      (pathname === "/" || pathname.includes("dashboard")) &&
                      "hover:text-slate-200"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faChartPie}
                          className="text-xl mr-2"
                        />
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Dashboard
                        </span>
                      </div>
                      <div className="flex shrink-0 ml-2">
                        <svg
                          className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                            open && "rotate-180"
                          }`}
                          viewBox="0 0 12 12">
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/dashboard/main"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Main
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/dashboard/analytics"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Analytics
                          </span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink
                          end
                          to="/dashboard/fintech"
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                            (isActive ? "!text-indigo-500" : "")
                          }>
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Fintech
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            }}
          </SidebarLinkGroup> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
