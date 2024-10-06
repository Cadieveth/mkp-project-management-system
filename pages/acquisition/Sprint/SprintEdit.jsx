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
  faCheck,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import PackageDropdown from "../../master/PackageCategory/PackageDropdown";
import AccountAutocomplete from "../../master/Account/AccountDropdown";
import BusinessCheckBox from "../../master/BusinessCategory/BusinessCheckBox";
import DivisionDropdown from "../../master/Division/DivisionDropdown";
import PicCommDropdown from "../../master/Partner/PicCommDropdown";
import PicInternalDropdown from "../../master/Partner/PicInternalDropdown";
import PicProjDropdown from "../../master/Partner/PicProjDropdown";
import ProbabilityDropdown from "../../master/Probability/ProbabilityDropdown";
import SalesStageDropdown from "../../master/SalesStage/SalesStageDropdown";
import SprintStatus from "./SprintStatus";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import moment from "moment/moment";
import DatePickerNew from "../../../components/DatePickerNew";
import DatePickerMonth from "../../../components/DatePickerMonth";
import DatePickerYear from "../../../components/DatePickerYear";
import { adaptV4Theme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ValidDelete from "../../../components/ValidDelete";
import SprintValid from "./SprintValid";

function SprintEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { dataSprint, setNotif, setLoadingState } = useStateContext();
  const [detailSprint, setDetailSprint] = useState({});
  const [cpSprint, setCpSprint] = useState({});
  const [merchantSprint, setMerchantSprint] = useState({});
  const [divisionSprint, setDivisionSprint] = useState([]);

  const [divisionId, setDivisionId] = useState("");
  const [selectedDivisionToAdd, setSelectedDivisionToAdd] = useState(null);
  const [resetDropdown, setResetDropdown] = useState(false);
  const [selectedDivisions, setSelectedDivisions] = useState([]);

  const [id, setId] = useState(-99);
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);

  // DATA API
  const [sprintCode, setSprintCode] = useState("");
  const [sprintDate, setSprintDate] = useState(moment().format("DD MMM YYYY"));
  const [businessCtgrId, setBusinessId] = useState(-99);
  const [accountId, setAccountId] = useState(-99);
  const [projectCtgrId, setProjectCtgrId] = useState(-99);
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
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);

  const fetchData = async () => {
    setLoadingState(true);
    setDetailSprint({});
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/detail/${dataSprint.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.meta.message);
        console.log("Hasil respons:", data.result.sprint.sprintDate);
        // setDetailSprint(data.result.sprint);
        // setCpSprint(data.result.merchantCp);
        // setMerchantSprint(data.result.merchant);
        setSprintDate(data.result.sprint.sprintDate);
        setSprintCode(data.result.sprint.sprintCode);
        setProjectCtgrId(data.result.sprint.projectCtgrId);
        setSelectedBusinesses(data.result.sprint.business_ctgr);
        setPicCommId(data.result.sprint.picCommercialId);
        setPicrojectId(data.result.sprint.picProjectId);
        setAccountId(data.result.sprint.accountId);
        // DATA MERCHANT
        setMerchantName(data.result.merchant.merchantName);
        setCountry(data.result.merchant.country);
        setProvince(data.result.merchant.province);
        setCity(data.result.merchant.city);
        setPhone(data.result.merchant.phone);
        setZipCode(data.result.merchant.zipCode);
        setLongitude(data.result.merchant.longitude);
        setLatitude(data.result.merchant.latitude);
        setAddress(data.result.merchant.address);
        // DATA CP
        setCpName(data.result.merchantCp.cpName);
        setCpPhone(data.result.merchantCp.cpPhone);
        setCpEmail(data.result.merchantCp.cpEmail);
        setCpDepartment(data.result.merchantCp.cpDepartment);
        setCpAddress(data.result.merchantCp.cpAddress);

        setDivisionSprint(data.result.sprintDivision);
        setNotif("success", data.meta.message);
        console.log("sprintDateDetail : ", sprintDate);
      } else {
        console.log("Gagal: ", data.meta.message);
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("Error ", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const getDataList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/division/list/${dataSprint.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        setDivisionSprint(data.result);
      } else {
        console.log(data.meta.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function formatDivisions() {
    return selectedDivisions.map((division) => ({
      divisionId: division.id,
      divisionCode: division.divisionCode,
    }));
  }

  const addDivisionToTable = () => {
    if (divisionId !== "") {
      const isDuplicate = divisionSprint.some(
        (division) => division.divisionId === divisionId
      );
      console.log(isDuplicate);
      if (isDuplicate) {
        setNotif(
          "warning",
          "Division with this ID already exists in the table."
        );
      } else {
        saveDataDivisionSprint();
        //menuju api
        // ketika ok hit api detail sprint
      }
    }
    setResetDropdown(true);
    // if (selectedDivisionToAdd) {
    //   setSelectedDivisions((prevSelectedDivisions) => {
    //     if (
    //       prevSelectedDivisions.some(
    //         (item) => item.id === selectedDivisionToAdd.id
    //       )
    //     ) {
    //       alert("Division with this ID already exists in the table.");
    //       return prevSelectedDivisions;
    //     } else {
    //       return [...prevSelectedDivisions, selectedDivisionToAdd];
    //     }
    //   });
    //   setSelectedDivisionToAdd(null);
    //   setDivisionId("");
    // }
    // cara agar tidak duplikat
    // divisionSprint (dia berupa array of obj)
    // pakai array method untuk menentukan apakah divisionID yang akan ditambahkan sudah
    // ada di divisionSprint
    return;
    // urutan tambah data division untuk sprint:
    // 1. hit API tambah divisi (mengirim ID Sprint dan ID Division)
    // 2. Jika response === ok, getDivisinSprint (buat mengambil detail data dari divisi sprint)
  };

  const saveDataDivisionSprint = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        sprintId: dataSprint.id,
        divisionId: divisionId,
      };

      const url = `${config.api_ptms}/sprint/division/add`;

      const method = "POST";

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setNotif(
          "success",
          "The data has been successfully added to the database."
        );
        getDataList();
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const saveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        id: dataSprint.id,
        sprintCode: dataSprint.sprintCode,
        sprintDate: sprintDate,
      };
      const response = await fetch(`${config.api_ptms}/sprint/edit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        closePage();
        setNotif("success", responseData.meta.message);
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const removeDivisionFromTable = (divisionId) => {
    setSelectedDivisions((prevSelectedDivisions) => {
      return prevSelectedDivisions.filter((item) => item.id !== divisionId);
    });
  };

  const closePage = () => {
    navigate("/sprint");
  };

  const handleSprintDateChange = (newSprintDate) => {
    console.log(newSprintDate);
    setSprintDate(newSprintDate);
  };

  useEffect(() => {
    fetchData();
    // setSprintDate(detailSprint.sprintDate ?? "");
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            <div className="flex justify-center items-center min-top-screen mb-10">
              <div className="w-full">
                <div className="bg-white shadow-lg rounded overflow-hidden border border-slate-200 rounded-2xl">
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
                                text="Update"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  saveEdit();
                                  return;
                                  console.log(
                                    "ini dataSprint dari Edit: ",
                                    dataSprint
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-2xl font-semibold text-center mb-10 mt-5">
                      SPRINT EDIT DATA FORM
                    </h1>
                    {/* ROW 0 */}
                    <div className=" px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Sprint No"
                          placeholder="Input any Sprint Number"
                          type="standard"
                          value={sprintCode}
                          readOnly={true}
                        />
                      </div>
                      <div className="w-1/2"></div>
                    </div>
                    {/* ROW 1 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <DatePickerNew
                          label="Sprint Date"
                          placeholder="Select Sprint Date"
                          value={sprintDate}
                          onChange={(value) => {
                            setSprintDate(value);
                          }}
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <PackageDropdown
                          type="standard"
                          value={projectCtgrId}
                          onChange={(value) => {
                            setProjectCtgrId(value);
                          }}
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
                            onChange={(value) => setSelectedBusinesses(value)}
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
                                {divisionSprint.map((division) => (
                                  <tr key={division.id}>
                                    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                      <div className="flex justify-start items-center">
                                        <div>
                                          <Button
                                            type="icon"
                                            iconName={faTrash}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              // RemoveData(division.id);
                                              setId(division.id);
                                              setValidDelModalOpen(true);
                                            }}
                                          />
                                        </div>
                                        <div>
                                          <Button
                                            type="icon"
                                            iconName={faListCheck}
                                          />
                                        </div>
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
                          type="standard"
                          value={picCommercialId}
                          onChange={(value) => {
                            setPicCommId(value);
                          }}
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <PicProjDropdown
                          type="standard"
                          value={picProjectId}
                          onChange={(value) => {
                            setPicrojectId(value);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 3 */}
                    <div className="flex justify-between px-8">
                      {/* INI AUTOCOMP MASIH NGADAT */}
                      <div className="w-1/2 mr-8 mt-2.5">
                        <AccountAutocomplete
                          type="standard"
                          value={accountId}
                          onChange={(value) => {
                            setAccountId(value);
                          }}
                        />
                      </div>
                      <div className="w-1/2 mt-3.5">
                        <TextFieldGlobal
                          label="Merchant Name"
                          placeholder="Input any Name for Merchant"
                          type="standard"
                          value={merchantName}
                          onChange={(value) => {
                            setMerchantName(value);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 4 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="Country"
                          placeholder="Input Country"
                          type="standard"
                          value={country}
                          onChange={(value) => {
                            setCountry(value);
                          }}
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Province"
                          placeholder="Input Province"
                          type="standard"
                          value={province}
                          onChange={(value) => {
                            setProvince(value);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 5 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="City"
                          placeholder="Input City"
                          type="standard"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Phone"
                          placeholder="Input Phone Number"
                          type="standard"
                          value={phone}
                          onChange={(value) => {
                            setPhone(value);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 6 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="Zip Code"
                          placeholder="Input Zip Code"
                          type="standard"
                          value={zipCode}
                          onChange={(value) => {
                            setZipCode(value);
                          }}
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
                          type="standard"
                          value={longitude}
                          onChange={(value) => {
                            setLongitude(value);
                          }}
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Latitude"
                          placeholder="Example: -77.0364"
                          type="standard"
                          value={latitude}
                          onChange={(value) => {
                            setLatitude(value);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 8 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Address"
                          placeholder="Input any Address"
                          multiline={true}
                          rows={3}
                          type="standard"
                          value={address}
                          onChange={(value) => {
                            setAddress(value);
                          }}
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
                              type="standard"
                              value={cpName}
                              onChange={(value) => {
                                setCpName(value);
                              }}
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Phone"
                              placeholder="Input Contact Person Phone Number"
                              type="standard"
                              value={cpPhone}
                              onChange={(value) => {
                                setCpPhone(value);
                              }}
                            />
                          </div>
                        </div>
                        {/* ROW 10 */}
                        <div className="flex justify-between px-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Email"
                              placeholder="Input Contact Person E-Mail"
                              type="standard"
                              value={cpEmail}
                              onChange={(value) => {
                                setCpEmail(value);
                              }}
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Department"
                              placeholder="Input Department of Contact Person"
                              type="standard"
                              value={cpDepartment}
                              onChange={(value) => {
                                setCpDepartment(value);
                              }}
                            />
                          </div>
                        </div>
                        {/* ROW 11 */}
                        <div className="flex justify-between px-2 mb-4">
                          <div className="w-full mt-2.5">
                            <TextFieldGlobal
                              label="Address"
                              placeholder="Input any Address for Contact Person"
                              multiline={true}
                              rows={3}
                              type="standard"
                              value={cpAddress}
                              onChange={(value) => {
                                setCpAddress(value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ROW 12 */}
                    <div className="flex justify-between px-8 mt-2">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <ProbabilityDropdown
                          type="standard"
                          value={detailSprint.probabilityId ?? ""}
                          onChange={(newValue) => {
                            console.log("Selected value:", newValue);
                          }}
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <SalesStageDropdown
                          type="standard"
                          value={detailSprint.salesStageId ?? ""}
                          onChange={(newValue) => {
                            console.log("Selected value:", newValue);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 13 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldGlobal
                          label="Traffic Visitor"
                          placeholder="Input Number of Traffic Visitor"
                          type="standard"
                          value={detailSprint.trafficVisitor ?? ""}
                          onChange={(newValue) => {
                            console.log("Selected value:", newValue);
                          }}
                        />
                      </div>
                      <div className="w-1/2">
                        <DatePickerNew
                          label="Offering Released"
                          placeholder="Select Offering Released Date"
                          value={detailSprint.offerReleasedDate ?? ""}
                        />
                      </div>
                    </div>
                    {/* ROW 14 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8">
                        <DatePickerNew
                          label="Est. Closing"
                          placeholder="Select Estimate Closing Date"
                          value={detailSprint.estClosingDate ?? ""}
                        />
                      </div>
                      <div className="w-1/2">
                        <DatePickerNew
                          label="Actual Closing"
                          placeholder="Select Actual Closing Date"
                          value={detailSprint.actualClosingDate ?? ""}
                        />
                      </div>
                    </div>
                    {/* ROW 15 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2">
                        <TextFieldGlobal
                          label="Est. Potential Revenue of Month"
                          placeholder="Input Amount of Estimate Potential Revenue of Month"
                          type="standard"
                          value={detailSprint.estPotentialRevenueMonth ?? ""}
                          onChange={(newValue) => {
                            console.log("Selected value:", newValue);
                          }}
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Total Revenue"
                          placeholder="Input Amount of Contract Value"
                          type="standard"
                          value={detailSprint.totalContractValue ?? ""}
                          onChange={(newValue) => {
                            console.log("Selected value:", newValue);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 16 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8">
                        <DatePickerNew
                          label="Est. Live Date"
                          placeholder="Select Estimate Live Date"
                          value={detailSprint.estLiveDate ?? ""}
                        />
                      </div>
                      <div className="w-1/2">
                        <DatePickerNew
                          label="Actual Live Date"
                          placeholder="Select Actual Live Date"
                          value={detailSprint.actLiveDate ?? ""}
                        />
                      </div>
                    </div>
                    {/* ROW 17 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8">
                        <DatePickerMonth
                          label="End Contract"
                          placeholder="Select End Contract"
                          value={detailSprint.endContractDate ?? ""}
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Tags"
                          placeholder="Enter any Tags"
                          type="standard"
                          value={detailSprint.tags ?? ""}
                          onChange={(newValue) => {
                            console.log("Selected value:", newValue);
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 19 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Remark"
                          placeholder="Enter any Remark"
                          multiline={true}
                          rows={4}
                          type="standard"
                          value={detailSprint.remark ?? ""}
                          onChange={(newValue) => {
                            console.log("Selected value:", newValue);
                          }}
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
                                iconName={faCheck}
                                text="Update"
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
      <SprintValid
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        getDataList={getDataList}
        dataDelete={id}
        apiUrl={`${config.api_ptms}/sprint/division/remove/${id}`}
      />
    </div>
  );
}

export default SprintEdit;
