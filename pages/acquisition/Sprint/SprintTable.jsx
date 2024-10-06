import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Donut, Circle } from "react-awesome-shapes";
import {
  faPlus,
  faFilter,
  faBars,
  faPenToSquare,
  faTrash,
  faLock,
  faLockOpen,
  faEllipsis,
  faFileLines,
  faFileCirclePlus,
  faFileExport,
  faChartPie,
  faChartLine,
  faChartSimple,
  faFaceDizzy,
  faFaceLaughBeam,
  faFaceSmile,
  faCircleUp,
  faCircleXmark,
  faCircleCheck,
  faCircle,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import PackageDropdown from "../../master/PackageCategory/PackageDropdown";
import AccountDropdown from "../../master/Account/AccountDropdown";
import BusinessDropdown from "../../master/BusinessCategory/BusinessDropdown";
import SalesStageDropdown from "../../master/SalesStage/SalesStageDropdown";
import DatePicker from "react-flatpickr";
import MomTable from "../MinuteOfMeeting/MomTable";
import SurveyTable from "../Survey/SurveyTable";

// import DropdownStatus from "../../../components/dropdownStatus";
import Button from "../../../components/Button";
import ValidationDelete from "../../../components/ValidationDelete";
import ValidationEdit from "../../../components/ValidationEdit";
import Chip from "../../../components/Chip";
import ModalGlobal from "../../../components/ModalGlobal";
import PaginationGlobal from "../../../components/PaginationGlobal";
import config from "../../../../config";
import { start } from "@popperjs/core";
import Tooltip from "../../../components/Tooltip";

// latest
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import CustomTable from "../../../components/CustomTable";
import { Menu, MenuList, MenuItem } from "@mui/material";
import DropdownDataPage from "../../../components/DropdownDataPage";
import ListItemGlobal from "../../../components/ListItemGlobal";
import SprintStatus from "./SprintStatus";

import moment from "moment/moment";
import DatePickerYear from "../../../components/DatePickerYear";
import KeywordForm from "../../../components/KeywordForm";
import SprintModal from "./SprintModal";
import MicrositeCheckBox from "../Microsite/MicrositeCheckBox";
import SprintDoc from "./SprintDoc";
import PicCommDropdown from "../../master/Partner/PicCommDropdown";
import PackageFilterDropdown from "../../master/PackageCategory/PackageFilterDropdown";
import AccountFilterDropdown from "../../master/Account/AccountFilterDropdown";
import PicCommFilterDropdown from "../../master/Partner/PicCommFilterDropdown";
import { handleTokenExpired } from "../../../utils/Utils";

function SprintTable() {
  const [list, setList] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [validEditModalOpen, setValidEditModalOpen] = useState(false);
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataResult, setDataResult] = useState({});
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [clearableStatus, setClearableStatus] = useState(true);
  const [dataDelete, setDataDelete] = useState({});
  const [dataEdit, setDataEdit] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [number, setNumber] = useState("");
  const [picCode, setPicCode] = useState(-99);
  const [year, setYear] = useState("");
  const [filter1, setFilter1] = useState(-99);
  const [filter2, setFilter2] = useState();
  const [filter3, setFilter3] = useState(-99);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const show = true;

  // filter new
  const baseFilterSprint = {
    // keyword: "",
    // dateFrom: moment().subtract(7, "days").format("YYYYMMDD"),
    // dateTo: moment().format("YYYYMMDD"),
    accountId: { label: "", value: -99 },
    projectCtgrId: { label: "", value: -99 },
    picCommercialId: { label: "", value: -99 },
  };

  const [filter, setFilter] = useState(baseFilterSprint);

  const [dataMoM, setDataMoM] = useState({});
  const [idMoM, setIdMoM] = useState({});
  const [itemPack, setItemPack] = useState({});
  const [dataSurvey, setDataSurvey] = useState({});
  const [idSurvey, setIdSurvey] = useState({});

  const [modalMoM, setModalMoM] = useState(false);
  const [modalSurvey, setModalSurvey] = useState(false);
  const [modalSurveyAdd, setModalSurveyAdd] = useState(false);

  // Latest
  const tableData = list;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dataMenu, setDataMenu] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { statusIsEditing } = useStateContext();

  const [openValue, setOpenValue] = useState(0);
  const [openNew, setOpenNew] = useState(0);
  const [closedWon, setClosedWon] = useState(0);
  const [closedWonNew, setClosedWonNew] = useState(0);
  const [closedLost, setClosedLost] = useState(0);
  const [closedLostNew, setClosedLostNew] = useState(0);

  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [dataLink, setDataLink] = useState({});

  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docPack, setDocPack] = useState({});

  // UseStateContext
  const {
    setNewDataSprint,
    setLoadingState,
    setNotif,
    setNewMomPack,
    setNewSurveyPack,
    setNewDivisionPack,
  } = useStateContext();

  const getSprintList = async (page, status = "") => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `${
          config.api_ptms
        }/sprint/list?keyword=${number}&year=${year}&projectCtgrId=${
          filter.projectCtgrId.value
        }&accountId=${filter.accountId.value}&status=${
          status == "OPEN" ? "" : status
        }&limit=${itemsPerPage}&offset=${offset}&picCommercialId=${
          filter.picCommercialId.value
        }`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        //list[0].ktpPic
        setList(data.result);
        setNotif("success", data.meta.message);
        handleClose();
        console.log("ini data result list", data.result);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const getSprintCount = async (page, status = "") => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${
          config.api_ptms
        }/sprint/count-list?keyword=${number}&year=${year}&projectCtgrId=${
          filter.projectCtgrId.value
        }&accountId=${filter.accountId.value}&status=${
          status == "OPEN" ? "" : status
        }&picCommercialId=${filter.picCommercialId.value}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTotalData(data.result);
      } else {
        setInfoMessage(data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  const getAnalytics = async () => {
    try {
      const year = moment().format("YYYY");
      const month = moment().format("MM");
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/analytic/sales-stages-all-sprint?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOpenValue(data.result[0].open);
        setOpenNew(data.result[0].openNew);
        setClosedWon(data.result[0].closedWon);
        setClosedWonNew(data.result[0].closedWonNew);
        setClosedLost(data.result[0].closedLost);
        setClosedLostNew(data.result[0].closedLostNew);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const applyFilter = (type) => {
    const encodedStatus = encodeURIComponent(status);
    setCurrentPage(1);

    getSprintList(1, encodedStatus);
    getSprintCount(1, encodedStatus);
  };

  const backToPage1 = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleClickAdd = () => {
    navigate("/sprint-add");
    statusIsEditing(false);
  };

  const handleClickEdit = () => {
    navigate("/sprint-add");
    statusIsEditing(true);
  };

  const resetFilters = () => {
    setNumber("");
    setFilter1(-99);
    setFilter2(-99);
    setStatus("OPEN");
  };

  const removeDashesFromDate = (date) => {
    return date.replace(/-/g, "");
  };

  const formatDate = (date) => {
    if (!date || date === "-") {
      return "-";
    }
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${year}/${month}/${day}`;
  };

  const formatCurrency = (value) => {
    if (typeof value !== "number") {
      return "Invalid input";
    }

    const formattedValue = value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });

    // Hilangkan simbol mata uang tambahan
    const parts = formattedValue.split(" ");
    const currencySymbol = parts[0];
    const formattedNumber = parts.slice(1).join(" ");

    // Pastikan nilai selalu dimulai dari kanan
    const paddedValue = formattedNumber.padStart(12, " ");

    return `${currencySymbol}${paddedValue}`;
  };

  const handleClick = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDataMenu({});
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handlePicChange = (newCode) => {
    setPicCode(newCode);
  };

  const tableHeaders = [
    {
      title: "Action",
      value: "action",
      hidden: false,
      align: "left",
      width: "50px",
    },
    {
      title: "Sprint No.",
      value: "sprintCode",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Sprint Date",
      value: "sprintDate",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Merchant",
      value: "merchant",
      hidden: false,
      align: "left",
      width: "250px",
    },
    {
      title: "Account",
      value: "accountName",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Sales Stage",
      value: "salesStageName",
      hidden: false,
      align: "left",
      width: "300px",
    },
    {
      title: "Probability",
      value: "probabilityName",
      hidden: false,
      align: "left",
      width: "300px",
    },
    {
      title: "Product Category",
      value: "projectCtgrName",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "PIC",
      value: "picCommercialName",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Traffic Visitor",
      value: "trafficVisitor",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Total Contract Value",
      value: "totalContractValue",
      hidden: false,
      align: "right",
      width: "200px",
    },
    {
      title: "Est. Live",
      value: "estLiveDate",
      hidden: false,
      align: "left",
      width: "160px",
    },
    {
      title: "Est. End Contract",
      value: "endContractDate",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "Remark",
      value: "remark",
      hidden: false,
      align: "left",
      width: "400px",
    },
  ];

  const renderCell = (item, header) => {
    const formatedDate = [
      "sprintDate",
      "offerReleasedDate",
      "estClosingDate",
      "actualClosingDate",
      "estLiveDate",
      "actLiveDate",
    ];
    const formatedMonthYear = ["endContractDate"];
    const formatedCurrency = ["totalContractValue", "estPotentialRevenueMonth"];
    if (header.value === "action") {
      return (
        <div className="space-x-1 ml-2">
          <Button
            type="icon"
            iconName={faBars}
            onClick={(event) => handleClick(event, item)}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              style: {
                border: "1px solid #e4ecf4",
              },
            }}>
            <MenuList sx={{ width: 150 }}>
              {/* MENU 1 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModalOpen(true);
                  setDataResult(dataMenu);
                  setNewDataSprint(dataMenu);
                  handleClickEdit();
                  handleClose();
                }}>
                <ListItemGlobal type={"edit"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 2 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setValidDelModalOpen(true);
                  setDataDelete(dataMenu.id);
                  handleClose();
                }}>
                <ListItemGlobal type={"delete"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 3 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  // setDataMoM(dataMenu.id);
                  // setItemPack(dataMenu);
                  // setModalMoM(true);
                  setNewMomPack(dataMenu);
                  navigate("/sprint/Minute-of-meeting");
                  handleClose();
                }}>
                <ListItemGlobal type={"MoM"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 5 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  // setDataSurvey(item);
                  // setModalSurvey(true);
                  setNewSurveyPack(dataMenu);
                  navigate("/sprint/survey");
                  handleClose();
                }}>
                <ListItemGlobal type={"survey"} dataMenu={dataMenu} />
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setNewDivisionPack(dataMenu);
                  navigate("/sprint/Division");
                  handleClose();
                }}>
                <ListItemGlobal type={"division"} dataMenu={dataMenu} />
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setLinkModalOpen(true);
                  setDataLink(dataMenu);
                  handleClose();
                }}>
                <ListItemGlobal type={"link"} dataMenu={dataMenu} />
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setDocPack(dataMenu);
                  setDocModalOpen(true);
                  handleClose();
                }}>
                <ListItemGlobal type={"document"} dataMenu={dataMenu} />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      );
    } else if (formatedCurrency.includes(header.value)) {
      return (
        <span className="flex justify-end">
          {formatCurrency(item[header.value])}{" "}
        </span>
      );
    } else if (formatedDate.includes(header.value)) {
      const formattedDate = moment(item[header.value]).format("DD MMM YYYY");
      return (
        <span> {formattedDate == "Invalid date" ? "-" : formattedDate} </span>
      );
    } else if (formatedMonthYear.includes(header.value)) {
      const formatedMonthYears = moment(item[header.value]).format("MMM YYYY");
      return (
        <span>
          {formatedMonthYears == "Invalid date" ? "-" : formatedMonthYears}
        </span>
      );
    } else if (header.value === "merchant") {
      return (
        <div>
          <span className="font-bold" style={{ fontSize: "13px" }}>
            {item.merchantName &&
            item.merchantName.trim() !== "" &&
            item.merchantName !== "-"
              ? item.merchantName
              : "Unavailable Merchant Name Data"}
          </span>
          <br />
          <span
            className={`font-semibold ${
              item.statusConfirmMerchant === "D"
                ? "text-red-500"
                : item.statusConfirmMerchant === "O"
                ? "text-yellow-500"
                : item.statusConfirmMerchant === "C"
                ? "text-green-500"
                : ""
            }`}
            style={{ fontSize: "10px" }}>
            {item.statusConfirmMerchant
              ? item.statusConfirmMerchant === "D"
                ? "DRAFT"
                : item.statusConfirmMerchant === "O"
                ? "ON REVIEW"
                : item.statusConfirmMerchant === "C"
                ? "CONFIRMED"
                : "-"
              : "-"}
          </span>
        </div>
      );
    } else if (header.value === "probabilityName") {
      return (
        <div>
          <span className="font-bold" style={{ fontSize: "13px" }}>
            {item.probabilityName &&
            item.probabilityName.trim() !== "" &&
            item.probabilityName !== "-"
              ? item.probabilityName
              : "Unavailable Probability Data"}
          </span>
          <br />
          <span className="font-light" style={{ fontSize: "11px" }}>
            {item.probabilityDesc &&
            item.probabilityDesc.trim() !== "" &&
            item.probabilityDesc !== "-"
              ? item.probabilityDesc
              : "Unavailable Probability Description"}
          </span>
        </div>
      );
    } else if (header.value === "salesStageName") {
      if (!item[header.value] || item[header.value].trim() === "") {
        return <span className="ml-1">-</span>;
      } else if (item[header.value] === "CLOSED WON") {
        return (
          <div className="flex justify-between items-center" id="sales-row">
            {/* <div className="-mt-9">
            <Donut
              color="#ffffff"
              size="33px"
              width={["17px", "17px", "17px", "17px"]}
              zIndex={2}
            />
          </div> */}
            <div className="w-1/4" style={{ zIndex: 2 }}>
              <div
                style={{
                  position: "relative",
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}>
                <Circle
                  color="linear-gradient(135deg, #10b981, #10b981)"
                  size={["33px", "33px", "33px", "33px"]}
                  zIndex={2}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    border: "1px solid black",
                    borderRadius: "50%",
                  }}>
                  <div className="ml-2 mt-2">
                    <div
                      style={{ position: "relative", zIndex: 3 }}
                      className="font-bold text-white">
                      <FontAwesomeIcon icon={faCheck} size="xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-0.5 w-3/4 mr-20">{item[header.value]}</div>
          </div>
        );
      } else if (item[header.value] === "CLOSED LOST") {
        return (
          <div className="flex justify-between items-center" id="sales-row">
            {/* <div className="-mt-9">
            <Donut
              color="#ffffff"
              size="33px"
              width={["17px", "17px", "17px", "17px"]}
              zIndex={2}
            />
          </div> */}
            <div className="w-1/4" style={{ zIndex: 2 }}>
              <div
                style={{
                  position: "relative",
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}>
                <Circle
                  color="linear-gradient(135deg, #ff0000, #ff0000)"
                  size={["33px", "33px", "33px", "33px"]}
                  zIndex={2}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    border: "1px solid black",
                    borderRadius: "50%",
                  }}>
                  <div className="ml-2.5 mt-2">
                    <div
                      style={{ position: "relative", zIndex: 3 }}
                      className="font-bold text-white">
                      <FontAwesomeIcon icon={faXmark} size="xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-0.5 w-3/4 mr-20">{item[header.value]}</div>
          </div>
        );
      } else {
        return (
          <div className="flex justify-between items-center" id="sales-row">
            {/* <div className="-mt-9">
            <Donut
              color="#ffffff"
              size="33px"
              width={["17px", "17px", "17px", "17px"]}
              zIndex={2}
            />
          </div> */}
            <div style={{ zIndex: 2 }}>
              <div
                style={{
                  position: "relative",
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}>
                <Circle
                  color="linear-gradient(135deg, #1e40af, #1e40af)"
                  size={["33px", "33px", "33px", "33px"]}
                  zIndex={2}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    border: "1px solid blue",
                    borderRadius: "50%",
                  }}>
                  <div className="ml-1 mt-2">
                    <div
                      style={{ position: "relative", zIndex: 3 }}
                      className="font-bold text-white">
                      {item[header.value]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-3 mt-0.5">{item.salesStageDesc}</div>
          </div>
        );
      }
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  const handleKeywordChange = (newKeyword) => {
    setNumber(newKeyword);
  };

  const handleClickMicrosite = (id) => {
    const url = `http://localhost:3000/sprint/${id}`;
    window.location.href = url;
  };

  useEffect(() => {
    getSprintList(currentPage, number, filter1, filter2, startDate, endDate);
    getSprintCount(currentPage, number, filter1, filter2, startDate, endDate);
    getAnalytics();
  }, [currentPage]);

  // useEffect(() => {
  //   console.log("Isi Analytics", analytics[0].open);
  // }, [analytics]);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div>
        <h1 className="text-2xl md:text-2xl text-slate-800 font-bold">
          Sprint
        </h1>
      </div>
      <div className="row">
        {/* ROW ATAS */}
        <div className="flex row mb-2">
          <div className="w-1/3 mr-4 mt-1">
            {/*  */}
            <KeywordForm keyword={number} onChange={handleKeywordChange} />
          </div>
          <div className="w-1/3 mr-4 mt-0">
            <PackageFilterDropdown
              value={filter.projectCtgrId}
              // onChange={(defaultValue) => setFilter1(parseInt(defaultValue))}
              onChange={(value) => {
                setFilter({
                  ...filter,
                  projectCtgrId: value ?? {
                    label: "All",
                    value: -99,
                  },
                });
              }}
            />
          </div>
          <div className="w-1/3 mt-0">
            <AccountFilterDropdown
              value={filter.accountId}
              // value={{ value: 16, label: "BYL(5)" }}
              // onChange={(defaultValue) => setFilter2(parseInt(defaultValue))}
              onChange={(value) => {
                setFilter({
                  ...filter,
                  accountId: value ?? {
                    label: "All",
                    value: -99,
                  },
                });
              }}
            />
          </div>
        </div>
        {/* ROW BAWAH */}
        <div className="flex row mb-5">
          <div className="w-1/3 mr-4 -mt-1.5">
            <DatePickerYear
              value={year}
              onChange={(value) => setYear(moment(value).format("YYYY"))}
            />
          </div>
          <div className="w-1/3 mr-4 mt-1.5">
            <SprintStatus
              status={status}
              onChange={handleStatusChange}
              show={show}
            />
          </div>
          <div className="w-1/3 mt-0.5">
            <PicCommFilterDropdown
              value={filter.picCommercialId}
              onChange={(value) => {
                setFilter({
                  ...filter,
                  picCommercialId: value ?? {
                    label: "All",
                    value: -99,
                  },
                });
              }}
            />
          </div>
        </div>
        {/* BUTTON */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center -m-1.5">
            <div className="m-1.5">
              <Button
                type="primary"
                iconName={faFilter}
                text="Filter"
                onClick={() => {
                  applyFilter();
                }}
              />
            </div>
          </div>
        </div>
        {/* ANALYTICS */}
        <div>
          <div className="flex justify-between">
            {/* 1 */}
            <div className="flex justify-between border border-slate-200 w-1/3 mr-4 h-[80px] p-1 rounded-lg overflow-hidden">
              <div className="w-1/3 flex justify-start items-center h-20 text-6xl -ml-5">
                <FontAwesomeIcon
                  icon={faCircleUp}
                  size="2xl"
                  style={{ color: "#1e40af" }}
                />
              </div>
              <div className="h-full w-2/3 mr-2 mt-1">
                <div className="flex justify-end text-sm font-bold">OPEN</div>
                <div className="flex justify-end text-2xl font-bold text-[#1e40af]">
                  {openValue}
                </div>
                <div className="flex justify-end text-xs font-bold">
                  {openNew} this Month
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className="flex justify-between border border-slate-200 w-1/3 h-[80px] p-1 rounded-lg overflow-hidden">
              <div className="w-1/3 flex justify-start items-center h-20 text-6xl -ml-5">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="2xl"
                  style={{ color: "#1e40af" }}
                />
              </div>
              <div className="h-full w-2/3 mr-2 mt-1">
                <div className="flex justify-end text-sm font-bold">
                  CLOSE LOST
                </div>
                <div className="flex justify-end text-2xl font-bold text-[#1e40af]">
                  {closedLost}
                </div>
                <div className="flex justify-end text-xs font-bold">
                  {closedLostNew} this Month
                </div>
              </div>
            </div>
            {/* 3 */}
            <div className="flex justify-between border border-slate-200 w-1/3 ml-4 h-[80px] p-1 rounded-lg overflow-hidden">
              <div className="w-1/3 flex justify-start items-center h-20 text-6xl -ml-5">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="2xl"
                  style={{ color: "#1e40af" }}
                />
              </div>
              <div className="h-full w-2/3 mr-2 mt-1">
                <div className="flex justify-end text-sm font-bold">
                  CLOSE WON
                </div>
                <div className="flex justify-end text-2xl font-bold text-[#1e40af]">
                  {closedWon}
                </div>
                <div className="flex justify-end text-xs font-bold">
                  {closedWonNew} this Month
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ROW AND ADD */}
        <div className="flex justify-between mb-5">
          <div className="ml-3 flex">
            <DropdownDataPage
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              toPage1={backToPage1}
              onChange={(item) => setItemsPerPage(item)}
            />
          </div>
          <div className="mt-8">
            <Button
              type="primary"
              iconName={faPlus}
              text="Add Data"
              onClick={handleClickAdd}
            />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
          <div>
            <div className="overflow-x-auto overflow-y-auto">
              <CustomTable
                headers={tableHeaders}
                items={tableData}
                renderCell={renderCell}
                checkBox={false}
              />
            </div>
          </div>
        </div>
        <div className="px-6 py-8">
          <PaginationGlobal
            totalItems={totalData}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <ValidationDelete
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        getDataList={getSprintList}
        getDataCount={getSprintCount}
        dataDelete={dataDelete}
        setCurrentPage={currentPage}
        setKeyword={keyword}
        setStatus={status}
        toPage1={backToPage1}
        apiUrl={`${config.api_ptms}/sprint/remove/${dataDelete}`}
      />
      <SprintModal
        modalOpen={linkModalOpen}
        setModalOpen={setLinkModalOpen}
        data={dataLink}
      />
      <SprintDoc
        modalOpen={docModalOpen}
        setModalOpen={setDocModalOpen}
        data={docPack}
      />
      {/* <MomTable
        modalOpen={modalMoM}
        setModalOpen={setModalMoM}
        dataMoM={dataMoM}
        itemPack={itemPack}
      /> */}
      {/* <MomAdd
        modalOpen={modalMoMAdd}
        setModalOpen={setModalMoMAdd}
        idMoM={idMoM}
      /> */}
      {/* <SurveyTable
        modalOpen={modalSurvey}
        setModalOpen={setModalSurvey}
        dataSurvey={dataSurvey}
      /> */}
    </div>
  );
}

export default SprintTable;
