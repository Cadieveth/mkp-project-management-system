import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import Button from "../../../components/Button";
import config from "../../../../config";
import {
  faPlus,
  faFloppyDisk,
  faArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PackageDropdown from "../../master/PackageCategory/PackageDropdown";
import AccountDropdown from "../../master/Account/AccountDropdown";
import ProbabilityDropdown from "../../master/Probability/ProbabilityDropdown";
import SalesStageDropdown from "../../master/SalesStage/SalesStageDropdown";
import PicCommDropdown from "../../master/Partner/PicCommDropdown";
import PicProjDropdown from "../../master/Partner/PicProjDropdown";
import ModalGlobal from "../../../components/ModalGlobal";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
// import DatePickerGlobal from "../../../components/DatePickerGlobal";
import DivisionDropdown from "../../master/Division/DivisionDropdown";
import BusinessCheckBox from "../../master/BusinessCategory/BusinessCheckBox";

import moment from "moment/moment";
// import DatePickerMonth from "../../../components/DatePickerMonth";
import dayjs from "dayjs";
import DatePickerNew from "../../../components/DatePickerNew";
import DatePickerMonth from "../../../components/DatePickerMonth";
import ModalReason from "../../../components/ModalReason";

function SprintAdd({}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { dataSprint, setLoadingState, setNotif } = useStateContext();
  const [sprintCode, setSprintCode] = useState("");
  const [sprintDate, setSprintDate] = useState(moment().format("DD MMM YYYY"));
  const [businessCtgrId, setBusinessId] = useState(-99);
  const [accountId, setAccountId] = useState(-99);
  const [projectCtgrId, setProjectId] = useState(-99);
  const [probabilityId, setProbabilityId] = useState(-99);
  const [picCommercialId, setPicCommId] = useState(-99);
  const [picProjectId, setPicrojectId] = useState(-99);
  const [salesStageId, setSalesStageId] = useState(-99);
  const [trafficVisitor, setTrafficVisitor] = useState(null);
  const [offerReleasedDate, setOfferReleasedDate] = useState(
    moment().format("DD MMM YYYY")
  );
  const [linkOfferingLetter, setOfferingLetter] = useState("");
  const [estPotentialRevenueMonth, setEstPRM] = useState(null);
  const [contractPeriod, setContractPeriod] = useState(0);
  const [totalContractValue, setContractValue] = useState(null);
  const [estClosingDate, setEstClosing] = useState(
    moment().format("DD MMM YYYY")
  );
  const [actualClosingDate, setActClosing] = useState(
    moment().format("DD MMM YYYY")
  );
  const [merchantName, setMerchantName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [cpName, setCpName] = useState("");
  const [cpAddress, setCpAddress] = useState("");
  const [cpPhone, setCpPhone] = useState("");
  const [cpEmail, setCpEmail] = useState("");
  const [cpDepartment, setCpDepartment] = useState("");
  const [tags, setTags] = useState("");
  const [remark, setRemark] = useState("");
  const [estLiveDate, setEstLiveDate] = useState(
    moment().format("DD MMM YYYY")
  );
  const [actLiveDate, setActLiveDate] = useState(
    moment().format("DD MMM YYYY")
  );
  const [endContractDate, setEndContractDate] = useState(
    moment().format("MMM YYYY")
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [dataMenu, setDataMenu] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [divisionId, setDivisionId] = useState("");
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDivisionToAdd, setSelectedDivisionToAdd] = useState(null);
  const [resetDropdown, setResetDropdown] = useState(false);

  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  function formatDivisions() {
    return selectedDivisions.map((division) => ({
      divisionId: division.id,
      divisionCode: division.divisionCode,
    }));
  }

  async function saveAdd(reason) {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        sprintCode,
        sprintDate: moment(sprintDate).format("YYYYMMDD"),
        accountId,
        projectCtgrId,
        probabilityId,
        picCommercialId,
        picProjectId,
        salesStageId,
        trafficVisitor,
        offerReleasedDate: moment(offerReleasedDate).format("YYYYMMDD"),
        linkOfferingLetter,
        estPotentialRevenueMonth,
        contractPeriod,
        totalContractValue,
        estClosingDate: moment(estClosingDate).format("YYYYMMDD"),
        actualClosingDate: moment(actualClosingDate).format("YYYYMMDD"),
        merchantName,
        address,
        phone,
        country,
        province,
        city,
        zipCode,
        longitude,
        latitude,
        cpName,
        cpAddress,
        cpPhone,
        cpEmail,
        cpDepartment,
        tags,
        remark,
        reason,
        estLiveDate: moment(estLiveDate).format("YYYYMMDD"),
        actLiveDate: moment(actLiveDate).format("YYYYMMDD"),
        endContractDate: moment(endContractDate).format("YYYYMM"),
        businessCtgr: selectedBusinesses,
        division: formatDivisions(),
      };

      const response = await fetch(`${config.api_ptms}/sprint/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        console.log(responseJSON.meta.message);
        closePage();
        setNotif("success", responseJSON.meta.message);
        setReasonModalOpen(true);
      } else {
        console.log(responseJSON.meta.message);
        setNotif("warning", responseJSON.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  }

  const closePage = () => {
    navigate("/sprint");
    setSprintCode("");
    setSprintDate("");
    setBusinessId(-99);
    setAccountId(-99);
    setProjectId(-99);
    setProbabilityId(-99);
    setPicCommId(-99);
    setPicrojectId(-99);
    setSalesStageId(-99);
    setTrafficVisitor(null);
    setOfferReleasedDate("");
    setOfferingLetter("");
    setContractPeriod(null);
    setContractValue(null);
    setEstClosing("");
    setActClosing("");
    setMerchantName("");
    setAddress("");
    setPhone("");
    setCountry("");
    setProvince("");
    setCity("");
    setZipCode("");
    setLongitude(null);
    setLatitude(null);
    setCpName("");
    setCpAddress("");
    setCpPhone("");
    setCpEmail("");
    setCpDepartment("");
    setTags("");
    setRemark("");
    setEstPRM(null);
    setEstLiveDate("");
    setActLiveDate("");
    setEndContractDate("");
  };

  const removeDashesFromDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const year = parsedDate.getFullYear();
      const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = parsedDate.getDate().toString().padStart(2, "0");
      return `${year}${month}${day}`;
    } else {
      return "Invalid Date";
    }
  };

  // const addDivisionToTable = () => {
  //   if (selectedDivisionToAdd) {
  //     setSelectedDivisions((prevSelectedDivisions) => {
  //       if (
  //         prevSelectedDivisions.some(
  //           (item) => item.id === selectedDivisionToAdd.id
  //         )
  //       ) {
  //         alert("Division with this ID already exists in the table.");
  //         return prevSelectedDivisions;
  //       } else {
  //         return [...prevSelectedDivisions, selectedDivisionToAdd];
  //       }
  //     });
  //     setSelectedDivisionToAdd(null);
  //     setDivisionId("");
  //   }
  // };

  const addDivisionToTable = () => {
    if (selectedDivisionToAdd) {
      setSelectedDivisions((prevSelectedDivisions) => {
        if (
          prevSelectedDivisions.some(
            (item) => item.id === selectedDivisionToAdd.id
          )
        ) {
          alert("Division with this ID already exists in the table.");
          return prevSelectedDivisions;
        } else {
          return [...prevSelectedDivisions, selectedDivisionToAdd];
        }
      });
      setSelectedDivisionToAdd(null);
      setDivisionId("");
      setResetDropdown(true); // Atur resetDropdown menjadi true
    }
  };

  const removeDivisionFromTable = (divisionId) => {
    setSelectedDivisions((prevSelectedDivisions) => {
      return prevSelectedDivisions.filter((item) => item.id !== divisionId);
    });
  };

  const handleBusinessChange = (selectedValues) => {
    setSelectedBusinesses(selectedValues);
  };

  const handleClick = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDataMenu({});
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // useEffect(() => {
  //   if (contractPeriod && actLiveDate) {
  //     const endContractDate = moment(actLiveDate, "YYYYMMDD").add(
  //       contractPeriod,
  //       "months"
  //     );
  //     setEndContractDate(endContractDate.format("YYYYMMDD"));
  //   } else {
  //     setEndContractDate("");
  //   }
  // }, [contractPeriod, actLiveDate]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            <div className="flex justify-center items-center min-top-screen mb-10">
              <div className="w-full">
                <div className="bg-white shadow-lgoverflow-hidden border border-slate-200 rounded-2xl">
                  <div className="px-6 py-4">
                    {/* BUTTON TOP */}
                    <div className="flex mb-6 ml-12 mt-2   justify-end">
                      <div className="ml-2">
                        <div className="mt-0">
                          <div className="flex flex-wrap items-center -m-1.5">
                            <div className="m-1.5">
                              <Button
                                type="tertiary"
                                iconName={faArrowLeft}
                                text="Back"
                                onClick={closePage}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={faFloppyDisk}
                                text="Save"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReasonModalOpen(true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-2xl font-semibold text-center mb-10 mt-5">
                      SPRINT ADD DATA FORM
                    </h1>
                    {/* ROW 0 */}
                    <div className=" px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Sprint No"
                          placeholder="Input any Sprint Number"
                          value={sprintCode || ""}
                          onChange={(e) => setSprintCode(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2"></div>
                    </div>
                    {/* ROW 1 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        {/* <DatePickerGlobal
                          label="Sprint Date"
                          defaultValue={dayjs(getCurrentDate())}
                          onChange={(defaultValue) =>
                            setSprintDate(removeDashesFromDate(defaultValue))
                          }
                          readOnly={false}
                          type="standard"
                        /> */}
                        <DatePickerNew
                          label="Sprint Date"
                          value={sprintDate}
                          onChange={(value) =>
                            setSprintDate(removeDashesFromDate(value))
                          }
                          placeholder="Select Sprint Date"
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <PackageDropdown
                          onChange={(selectedValue) =>
                            setProjectId(parseInt(selectedValue))
                          }
                          defaultValue={projectCtgrId || -99}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 1 NEW */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-3">
                        <div
                          className="text-sm font-bold"
                          style={{ color: "#737379" }}>
                          Select Business
                        </div>
                        <div className="ml-0.5">
                          <BusinessCheckBox
                            onChange={(selectedValues) =>
                              setSelectedBusinesses(selectedValues)
                            }
                            selectedValues={selectedBusinesses}
                          />
                        </div>
                      </div>
                    </div>
                    {/* DIVISION CARD */}
                    <div className="justify-between px-8 mt-2 mb-2">
                      <div
                        className="mb-1 text-sm font-bold"
                        style={{ color: "#737379" }}>
                        Division
                      </div>
                      <div className="w-full border border-gray-400 px-5 py-5 rounded-xl">
                        <div className="flex justify-between">
                          <div className="w-1/2 mr-8">
                            <DivisionDropdown
                              onChange={(selectedValue) => {
                                setDivisionId(parseInt(selectedValue));
                                setResetDropdown(false); // Set resetDropdown menjadi false
                              }}
                              value={divisionId}
                              setSelectedDivisionToAdd={
                                setSelectedDivisionToAdd
                              }
                              type="standard"
                              reset={resetDropdown}
                            />
                          </div>
                          <div className="w-1/2 mt-2.5">
                            <Button
                              type="primary"
                              iconName={faPlus}
                              text="Add Division"
                              onClick={addDivisionToTable}
                            />
                          </div>
                        </div>
                        <div className="mt-5 w-full">
                          <div
                            className="w-full mr-5"
                            style={{ borderRadius: "3px" }}>
                            <table className="table-auto w-full">
                              <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                                <tr>
                                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/5">
                                    <div
                                      className="font-semibold text-left w-1/5"
                                      style={{ width: "10%" }}>
                                      Action
                                    </div>
                                  </th>
                                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/5">
                                    <div
                                      className="font-semibold text-left w-1/5"
                                      style={{ width: "20%" }}>
                                      Division Code
                                    </div>
                                  </th>
                                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/5">
                                    <div
                                      className="font-semibold text-left w-1/5"
                                      style={{ width: "20%" }}>
                                      Division Name
                                    </div>
                                  </th>
                                  <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-2/5">
                                    <div
                                      className="font-semibold text-left w-2/5"
                                      style={{ width: "50%" }}>
                                      Progress
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedDivisions.map((division) => (
                                  <tr key={division.id}>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                      <div className="flex justify-start items-center">
                                        <Button
                                          type="icon"
                                          iconName={faTrash}
                                          onClick={() =>
                                            removeDivisionFromTable(division.id)
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                      <div className="text-xs font-bold">
                                        {division.divisionCode}
                                      </div>
                                    </td>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                      <div className="text-xs font-bold">
                                        {division.divisionName}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="w-1/3"></div>
                        </div>
                      </div>
                    </div>
                    {/* ROW 2 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <PicCommDropdown
                          defaultValue={picCommercialId || -99}
                          onChange={(selectedValue) =>
                            setPicCommId(parseInt(selectedValue))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <PicProjDropdown
                          defaultValue={picProjectId || -99}
                          onChange={(selectedValue) =>
                            setPicrojectId(parseInt(selectedValue))
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 3 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <AccountDropdown
                          defaultValue={accountId || -99}
                          onChange={(selectedValue) =>
                            setAccountId(parseInt(selectedValue))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Merchant Name"
                          placeholder="Input any Name for Merchant"
                          value={merchantName || ""}
                          onChange={(e) => setMerchantName(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 4 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="Country"
                          placeholder="Input Country"
                          value={country || ""}
                          onChange={(e) => setCountry(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Province"
                          placeholder="Input Province"
                          value={province || ""}
                          onChange={(e) => setProvince(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 5 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="City"
                          placeholder="Input City"
                          value={city || ""}
                          onChange={(e) => setCity(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Phone"
                          placeholder="Input Phone Number"
                          value={phone || ""}
                          onChange={(e) => setPhone(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 6 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="Zip Code"
                          placeholder="Input Zip Code"
                          value={zipCode || ""}
                          onChange={(e) => setZipCode(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2 invisible">
                        <TextFieldGlobal />
                      </div>
                    </div>
                    {/* ROW 7 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="Longitude"
                          placeholder="Example: 38.8951"
                          value={longitude || null}
                          onChange={(e) =>
                            setLongitude(parseInt(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Latitude"
                          placeholder="Example: -77.0364"
                          value={latitude || null}
                          onChange={(e) =>
                            setLatitude(parseInt(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 8 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Address"
                          placeholder="Input any Address"
                          value={address || ""}
                          onChange={(e) => setAddress(e.target.value)}
                          multiline={true}
                          rows={3}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* CONTACT CARD */}
                    <div className="justify-between px-8 mt-2 mb-2 rounded-xl">
                      <div
                        className="mb-1 text-sm font-bold"
                        style={{ color: "#737379" }}>
                        Contact Person
                      </div>
                      <div className="w-full border border-gray-400 px-2 rounded-xl">
                        {/* ROW 9 */}
                        <div className="flex justify-between px-2 mt-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Name"
                              placeholder="Input any Name for Contact Person"
                              value={cpName || ""}
                              onChange={(e) => setCpName(e.target.value)}
                              type="standard"
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Phone"
                              placeholder="Input Contact Person Phone Number"
                              value={cpPhone || ""}
                              onChange={(e) => setCpPhone(e.target.value)}
                              type="standard"
                            />
                          </div>
                        </div>
                        {/* ROW 10 */}
                        <div className="flex justify-between px-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Email"
                              placeholder="Input Contact Person E-Mail"
                              value={cpEmail || ""}
                              onChange={(e) => setCpEmail(e.target.value)}
                              type="standard"
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Department"
                              placeholder="Input Department of Contact Person"
                              value={cpDepartment || ""}
                              onChange={(e) => setCpDepartment(e.target.value)}
                              type="standard"
                            />
                          </div>
                        </div>
                        {/* ROW 11 */}
                        <div className="flex justify-between px-2 mb-4">
                          <div className="w-full mt-2.5">
                            <TextFieldGlobal
                              label="Address"
                              placeholder="Input any Address for Contact Person"
                              value={cpAddress || ""}
                              onChange={(e) => setCpAddress(e.target.value)}
                              multiline={true}
                              rows={3}
                              type="standard"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ROW 12 */}
                    <div className="flex justify-between px-8 mt-2">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <ProbabilityDropdown
                          defaultValue={probabilityId || -99}
                          onChange={(selectedValue) =>
                            setProbabilityId(parseInt(selectedValue))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <SalesStageDropdown
                          defaultValue={salesStageId || -99}
                          onChange={(selectedValue) =>
                            setSalesStageId(parseInt(selectedValue))
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 13 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="Traffic Visitor"
                          placeholder="Input Number of Traffic Visitor"
                          value={trafficVisitor || null}
                          onChange={(e) =>
                            setTrafficVisitor(parseFloat(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2">
                        {/* <DatePickerGlobal
                          label="Offering Released"
                          defaultValue={offerReleasedDate || ""}
                          onChange={(defaultValue) =>
                            setOfferReleasedDate(
                              removeDashesFromDate(defaultValue)
                            )
                          }
                          readOnly={false}
                        /> */}
                        <DatePickerNew
                          label="Offering Released"
                          value={offerReleasedDate}
                          onChange={(value) =>
                            setOfferReleasedDate(removeDashesFromDate(value))
                          }
                          placeholder="Select Offering Released Date"
                        />
                      </div>
                    </div>
                    {/* ROW 14 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8">
                        {/* <DatePickerGlobal
                          label="Est. Closing"
                          defaultValue={estClosingDate || ""}
                          onChange={(defaultValue) =>
                            setEstClosing(removeDashesFromDate(defaultValue))
                          }
                          readOnly={false}
                        /> */}
                        <DatePickerNew
                          label="Est. Closing"
                          value={estClosingDate}
                          onChange={(value) =>
                            setEstClosing(removeDashesFromDate(value))
                          }
                          placeholder="Select Estimate Closing Date"
                        />
                      </div>
                      <div className="w-1/2">
                        {/* <DatePickerGlobal
                          label="Actual Closing"
                          defaultValue={actualClosingDate || ""}
                          onChange={(defaultValue) =>
                            setActClosing(removeDashesFromDate(defaultValue))
                          }
                          readOnly={false}
                        /> */}
                        <DatePickerNew
                          label="Actual Closing"
                          value={actualClosingDate}
                          onChange={(value) =>
                            setActClosing(removeDashesFromDate(value))
                          }
                          placeholder="Select Actual Closing Date"
                        />
                      </div>
                    </div>
                    {/* ROW 15 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2">
                        <TextFieldGlobal
                          label="Est. Potential Revenue of Month"
                          placeholder="Input Amount of Estimate Potential Revenue of Month"
                          value={estPotentialRevenueMonth || null}
                          onChange={(e) =>
                            setEstPRM(parseFloat(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        {/* <TextFieldGlobal
                          label="Contract Period"
                          placeholder="Input Contract Period"
                          value={contractPeriod || null}
                          onChange={(e) =>
                            setContractPeriod(parseFloat(e.target.value))
                          }
                          type="standard"
                        /> */}
                        <TextFieldGlobal
                          label="Total Revenue"
                          placeholder="Input Amount of Contract Value"
                          value={totalContractValue || null}
                          onChange={(e) =>
                            setContractValue(parseFloat(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 16 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8">
                        {/* <DatePickerGlobal
                          label="Est. Live Date"
                          defaultValue={estLiveDate || ""}
                          onChange={(defaultValue) =>
                            setEstLiveDate(removeDashesFromDate(defaultValue))
                          }
                          readOnly={false}
                        /> */}
                        <DatePickerNew
                          label="Est. Live Date"
                          value={estLiveDate}
                          onChange={(value) =>
                            setEstLiveDate(removeDashesFromDate(value))
                          }
                          placeholder="Select Estimate Live Date"
                        />
                      </div>
                      <div className="w-1/2">
                        {/* <DatePickerGlobal
                          label="Actual Live Date"
                          defaultValue={actLiveDate || ""}
                          onChange={(defaultValue) =>
                            setActLiveDate(removeDashesFromDate(defaultValue))
                          }
                          readOnly={false}
                        /> */}
                        <DatePickerNew
                          label="Actual Live Date"
                          value={actLiveDate}
                          onChange={(value) =>
                            setActLiveDate(removeDashesFromDate(value))
                          }
                          placeholder="Select Actual Live Date"
                        />
                      </div>
                    </div>
                    {/* ROW 17 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8">
                        {/* <DatePickerMonth
                          label="End Contract"
                          defaultValue={endContractDate}
                          onChange={(defaultValue) =>
                            setEndContractDate(
                              removeDashesFromDate(defaultValue)
                            )
                          }
                        /> */}
                        <DatePickerMonth
                          label="End Contract"
                          value={endContractDate}
                          onChange={(value) => setEndContractDate(value)}
                          placeholder="Select End Contract"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Tags"
                          placeholder="Enter any Tags"
                          value={tags || ""}
                          onChange={(e) => setTags(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 18 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5"></div>
                    </div>
                    {/* ROW 19 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Remark"
                          placeholder="Enter any Remark"
                          value={remark || ""}
                          onChange={(e) => setRemark(e.target.value)}
                          multiline={true}
                          rows={4}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* BUTTON BOTTOM*/}
                    <div className="flex mt-8 mb-2 ml-6 justify-end">
                      <div className="ml-2">
                        <div className="mt-0">
                          <div className="flex flex-wrap items-center -m-1.5">
                            <div className="m-1.5">
                              <Button
                                type="tertiary"
                                iconName={faArrowLeft}
                                text="Back"
                                onClick={closePage}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={faFloppyDisk}
                                text="Save"
                                // onClick={SaveAdd}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReasonModalOpen(true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ModalReason
        modalOpen={reasonModalOpen}
        setModalOpen={setReasonModalOpen}
        saveAdd={saveAdd}
      />
    </div>
  );
}

export default SprintAdd;
