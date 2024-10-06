import React, { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useStateContext } from "./ContextProvider";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Fintech from "./pages/Fintech";
import Customers from "./pages/ecommerce/Customers";
import Orders from "./pages/ecommerce/Orders";
import Shop from "./pages/ecommerce/Shop";
import Shop2 from "./pages/ecommerce/Shop2";
import Product from "./pages/ecommerce/Product";
import Cart from "./pages/ecommerce/Cart";
import Cart2 from "./pages/ecommerce/Cart2";
import Cart3 from "./pages/ecommerce/Cart3";
import Pay from "./pages/ecommerce/Pay";
import Campaigns from "./pages/Campaigns";
import UsersTabs from "./pages/community/UsersTabs";
import UsersTiles from "./pages/community/UsersTiles";
import Profile from "./pages/community/Profile";
import Feed from "./pages/community/Feed";
import Forum from "./pages/community/Forum";
import ForumPost from "./pages/community/ForumPost";
import Meetups from "./pages/community/Meetups";
import MeetupsPost from "./pages/community/MeetupsPost";
import CreditCards from "./pages/finance/CreditCards";
import Transactions from "./pages/finance/Transactions";
import TransactionDetails from "./pages/finance/TransactionDetails";
import JobListing from "./pages/job/JobListing";
import JobPost from "./pages/job/JobPost";
import CompanyProfile from "./pages/job/CompanyProfile";
import Messages from "./pages/Messages";
import TasksKanban from "./pages/tasks/TasksKanban";
import TasksList from "./pages/tasks/TasksList";
import Inbox from "./pages/Inbox";
import Calendar from "./pages/Calendar";
import Account from "./pages/settings/Account";
import Notifications from "./pages/settings/Notifications";
import Apps from "./pages/settings/Apps";
import Plans from "./pages/settings/Plans";
import Billing from "./pages/settings/Billing";
import Feedback from "./pages/settings/Feedback";
import Changelog from "./pages/utility/Changelog";
import Roadmap from "./pages/utility/Roadmap";
import Faqs from "./pages/utility/Faqs";
import EmptyState from "./pages/utility/EmptyState";
import PageNotFound from "./pages/utility/PageNotFound";
import KnowledgeBase from "./pages/utility/KnowledgeBase";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Onboarding01 from "./pages/Onboarding01";
import Onboarding02 from "./pages/Onboarding02";
import Onboarding03 from "./pages/Onboarding03";
import Onboarding04 from "./pages/Onboarding04";
import ButtonPage from "./pages/component/ButtonPage";
import FormPage from "./pages/component/FormPage";
import DropdownPage from "./pages/component/DropdownPage";
import AlertPage from "./pages/component/AlertPage";
import ModalPage from "./pages/component/ModalPage";
import PaginationPage from "./pages/component/PaginationPage";
import TabsPage from "./pages/component/TabsPage";
import BreadcrumbPage from "./pages/component/BreadcrumbPage";
import BadgePage from "./pages/component/BadgePage";
import AvatarPage from "./pages/component/AvatarPage";
import TooltipPage from "./pages/component/TooltipPage";
import AccordionPage from "./pages/component/AccordionPage";
import IconsPage from "./pages/component/IconsPage";
import PrivateRoute from "./pages/component/PrivateRoute";

import Warehouse from "./partials/dataview/Warehouse";
import Add from "./pages/warehouseComponent/WarehouseAdd";

// DATA MASTER
import PackageCategory from "./pages/master/PackageCategory/PackageCategory";
import ParameterPackage from "./pages/master/ParameterPackage/ParameterPackage";
import HardwarePackage from "./pages/master/HardwarePackage/HardwarePackage";
import BusinessCategory from "./pages/master/BusinessCategory/BusinessCategory";
import MasterAccount from "./pages/master/Account/Account";
import Probability from "./pages/master/Probability/Probability";
import SalesStage from "./pages/master/SalesStage/SalesStage";
import Alert from "@mui/material/Alert/Alert";
import Task from "./pages/master/Task/Task";
import Division from "./pages/master/Division/Division";

// DATA PTMS
import Sprint from "./pages/acquisition/Sprint/Sprint";
import SprintAdd from "./pages/acquisition/Sprint/SprintAdd";
import SprintEdit from "./pages/acquisition/Sprint/SprintEdit";
import SprintModul from "./pages/acquisition/Sprint/SprintModul";

import ModalLoading from "./components/ModalLoading";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Table from "./pages/master/Task/Task";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button";
import TaskDivision from "./pages/acquisition/TaskSprint/TaskDivision";
import LinkMain from "./pages/acquisition/Link/Link";
import ScrollToTop from "react-scroll-to-top";
import Mom from "./pages/acquisition/MinuteOfMeeting/Mom";
import Survey from "./pages/acquisition/Survey/Survey";
import MomForm from "./pages/acquisition/MinuteOfMeeting/MomForm";
import SurveyForm from "./pages/acquisition/Survey/SurveyForm";
import DashboardMain from "./pages/dashboard/MainDashboard/DashboardMain";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SprintDivision from "./pages/acquisition/SprintDivision/SprintDivision";
import SprintDivisionTable from "./pages/acquisition/SprintDivision/SprintDivisionTable";
import DragNDrop from "./pages/training/DragNDrop";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = !!token;
  const { loading, notifMsg, notifType, notification } = useStateContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // notifMsg(false);
    console.log(notifMsg);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
    }
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname, isAuthenticated, navigate]);

  const ref = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleClik = () => {
    scrollToTop();
    console.log("DI KLIK");
  };

  return (
    <div>
      {/* <Routes>
        {isAuthenticated === null && isAuthenticated === undefined && isAuthenticated === ""} ? (
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
        ) : (
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/fintech" element={<Fintech />} />
        )
      </Routes> */}
      {/* <ScrollToTop smooth /> */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={notification}
        autoHideDuration={2000}
        onClose={handleClose}
        sx={{
          marginTop: "40px",
        }}>
        <Alert
          style={{ minWidth: 400 }}
          className=" text-center"
          severity={notifType}>
          {notifMsg}
        </Alert>
      </Snackbar>

      {loading && <ModalLoading modalOpen={true} />}

      {/* <div className="border border-black w-full flex justify-end items-baseline">
        <Button
          type="primary"
          iconName={faArrowLeft}
          text="Back"
          onClick={handleClik}
        />
      </div> */}

      <Routes>
        {/* <Route path="/" element={<Signup />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}

        {/* MAIN DASHBOARD */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <DashboardMain />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* ====== MASTER ====== */}
        <Route
          path="/package-category"
          element={
            isAuthenticated ? (
              <PackageCategory />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/package-category/parameter-package"
          element={
            isAuthenticated ? (
              <ParameterPackage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/package-category/hardware-package"
          element={
            isAuthenticated ? (
              <HardwarePackage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/business-category"
          element={
            isAuthenticated ? (
              <BusinessCategory />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/account"
          element={
            isAuthenticated ? (
              <MasterAccount />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/probability"
          element={
            isAuthenticated ? (
              <Probability />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/sales-stage"
          element={
            isAuthenticated ? <SalesStage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/division"
          element={
            isAuthenticated ? <Division /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/division/task"
          element={
            isAuthenticated ? <Task /> : <Navigate to="/signin" replace />
          }
        />

        {/* ====== PTMS ====== */}
        <Route
          path="/sprint"
          element={
            isAuthenticated ? <Sprint /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/sprint-add"
          element={
            isAuthenticated ? <SprintAdd /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/sprint-edit"
          element={
            isAuthenticated ? <SprintEdit /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/sprint-modul"
          element={
            isAuthenticated ? (
              <SprintModul />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/sprint/taskDivision"
          element={
            isAuthenticated ? (
              <TaskDivision />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/sprint/link-sprint"
          element={
            isAuthenticated ? <LinkMain /> : <Navigate to="/signin" replace />
          }
        />

        {/* Minute of Meeting */}
        <Route
          path="/sprint/Minute-of-meeting"
          element={
            isAuthenticated ? <Mom /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/sprint/Minute-of-meeting/Form"
          element={
            isAuthenticated ? <MomForm /> : <Navigate to="/signin" replace />
          }
        />

        {/* Survey */}
        <Route
          path="/sprint/survey"
          element={
            isAuthenticated ? <Survey /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/sprint/Survey-Form"
          element={
            isAuthenticated ? <SurveyForm /> : <Navigate to="/signin" replace />
          }
        />

        {/* Division Sprint */}
        <Route
          path="/sprint/Division"
          element={
            isAuthenticated ? (
              <SprintDivision />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Training */}
        <Route
          path="/training"
          element={
            isAuthenticated ? <DragNDrop /> : <Navigate to="/signin" replace />
          }
        />

        {/* MICROSITE */}
        {/* AUTH */}
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Signin />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* TEMPLATE DASHBOARD */}
        <Route
          path="/dashboard/main"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            isAuthenticated ? <Analytics /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/dashboard/fintech"
          element={
            isAuthenticated ? <Fintech /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/customers"
          element={
            isAuthenticated ? <Customers /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/orders"
          element={
            isAuthenticated ? <Orders /> : <Navigate to="/signin" replace />
          }
        />
        {/* <Route
          path="/ecommerce/invoices"
          element={
            isAuthenticated ? <Invoices /> : <Navigate to="/signin" replace />
          }
        /> */}
        <Route
          path="/ecommerce/shop"
          element={
            isAuthenticated ? <Shop /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/shop-2"
          element={
            isAuthenticated ? <Shop2 /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/product"
          element={
            isAuthenticated ? <Product /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/cart"
          element={
            isAuthenticated ? <Cart /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/cart-2"
          element={
            isAuthenticated ? <Cart2 /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/cart-3"
          element={
            isAuthenticated ? <Cart3 /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/ecommerce/pay"
          element={
            isAuthenticated ? <Pay /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/campaigns"
          element={
            isAuthenticated ? <Campaigns /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/users-tabs"
          element={
            isAuthenticated ? <UsersTabs /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/users-tiles"
          element={
            isAuthenticated ? <UsersTiles /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/feed"
          element={
            isAuthenticated ? <Feed /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/forum"
          element={
            isAuthenticated ? <Forum /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/forum-post"
          element={
            isAuthenticated ? <ForumPost /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/meetups"
          element={
            isAuthenticated ? <Meetups /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/community/meetups-post"
          element={
            isAuthenticated ? (
              <MeetupsPost />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/finance/cards"
          element={
            isAuthenticated ? (
              <CreditCards />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/finance/transactions"
          element={
            isAuthenticated ? (
              <Transactions />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/finance/transaction-details"
          element={
            isAuthenticated ? (
              <TransactionDetails />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/job/job-listing"
          element={
            isAuthenticated ? <JobListing /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/job/job-post"
          element={
            isAuthenticated ? <JobPost /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/job/company-profile"
          element={
            isAuthenticated ? (
              <CompanyProfile />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/messages"
          element={
            isAuthenticated ? <Messages /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/tasks/kanban"
          element={
            isAuthenticated ? (
              <TasksKanban />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/tasks/list"
          element={
            isAuthenticated ? <TasksList /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/inbox"
          element={
            isAuthenticated ? <Inbox /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/calendar"
          element={
            isAuthenticated ? <Calendar /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/settings/account"
          element={
            isAuthenticated ? <Account /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/settings/notifications"
          element={
            isAuthenticated ? (
              <Notifications />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/settings/apps"
          element={
            isAuthenticated ? <Apps /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/settings/plans"
          element={
            isAuthenticated ? <Plans /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/settings/billing"
          element={
            isAuthenticated ? <Billing /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/settings/feedback"
          element={
            isAuthenticated ? <Feedback /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/utility/changelog"
          element={
            isAuthenticated ? <Changelog /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/utility/roadmap"
          element={
            isAuthenticated ? <Roadmap /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/utility/faqs"
          element={
            isAuthenticated ? <Faqs /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/utility/empty-state"
          element={
            isAuthenticated ? <EmptyState /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/utility/404"
          element={
            isAuthenticated ? (
              <PageNotFound />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/utility/knowledge-base"
          element={
            isAuthenticated ? (
              <KnowledgeBase />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            isAuthenticated ? (
              <ResetPassword />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/onboarding-01"
          element={
            isAuthenticated ? (
              <Onboarding01 />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/onboarding-02"
          element={
            isAuthenticated ? (
              <Onboarding02 />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/onboarding-03"
          element={
            isAuthenticated ? (
              <Onboarding03 />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/onboarding-04"
          element={
            isAuthenticated ? (
              <Onboarding04 />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/component/button"
          element={
            isAuthenticated ? <ButtonPage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/component/form"
          element={
            isAuthenticated ? <FormPage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/component/dropdown"
          element={
            isAuthenticated ? (
              <DropdownPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/component/alert"
          element={
            isAuthenticated ? <AlertPage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/component/modal"
          element={
            isAuthenticated ? <ModalPage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/component/pagination"
          element={
            isAuthenticated ? (
              <PaginationPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/component/tabs"
          element={
            isAuthenticated ? <TabsPage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/component/breadcrumb"
          element={
            isAuthenticated ? (
              <BreadcrumbPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/component/badge"
          element={
            isAuthenticated ? <BadgePage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/component/avatar"
          element={
            isAuthenticated ? <AvatarPage /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/component/tooltip"
          element={
            isAuthenticated ? (
              <TooltipPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/component/accordion"
          element={
            isAuthenticated ? (
              <AccordionPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/component/icons"
          element={
            isAuthenticated ? <IconsPage /> : <Navigate to="/signin" replace />
          }
        />

        <Route
          path="/partials/dataview/warehouse"
          element={
            isAuthenticated ? <Warehouse /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/pages/warehouse-component/warehouse-add"
          element={
            isAuthenticated ? <Add /> : <Navigate to="/signin" replace />
          }
        />
        {/* <Route
          path="/pages/package-category/package-category"
          element={
            isAuthenticated ? (
              <packageCategory />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
