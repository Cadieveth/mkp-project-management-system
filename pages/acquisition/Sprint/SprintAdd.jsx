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
  faListCheck,
  faCheck,
  faSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import SprintValid from "./SprintValid";
import LinearProgressBar from "../../../components/LinearProgressBar";
import { styled, Box, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import MultiProgress, { ProgressComponentProps } from "react-multi-progress";
import ModalReasonStatus from "../../../components/ModalReasonStatus";
import MicrositeCheckBox from "../Microsite/MicrositeCheckBox";
import SprintModalHistory from "./SprintModalHistory";
import TextFieldNumberGlobal from "../../../components/TextFieldNumberGlobal";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: theme.palette.mode === "light" ? "#1c44ac" : "#308fe8",
  },
}));

function SprintAdd({}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const {
    dataSprint,
    setLoadingState,
    setNotif,
    isEditing,
    setNewDivisionId,
    statusOpenViaDivision,
    setNewTaskSprint,
  } = useStateContext();
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [divisionSprint, setDivisionSprint] = useState([]);
  const baseFormSprint = {
    accountId: { label: "", value: -99 },
    projectCtgrId: { label: "", value: -99 },
    picCommercialId: { label: "", value: -99 },
    picProjectId: { label: "", value: -99 },
    salesStageId: { label: "", value: -99 },
    probabilityId: { label: "", value: -99 },
  };

  const [form, setForm] = useState(baseFormSprint);
  const [id, setId] = useState(-99);
  const [sprintCode, setSprintCode] = useState("");
  const [sprintDate, setSprintDate] = useState(moment().format("DD MMM YYYY"));
  const [businessCtgrId, setBusinessId] = useState(-99);
  const [accountId, setAccountId] = useState(-99);
  const [projectCtgrId, setprojectCtgrId] = useState(-99);
  const [probabilityId, setProbabilityId] = useState(-99);
  const [picCommercialId, setPicCommId] = useState(-99);
  const [picProjectId, setPicrojectId] = useState(-99);
  const [salesStageId, setSalesStageId] = useState(-99);
  const [trafficVisitor, setTrafficVisitor] = useState(0);
  const [offerReleasedDate, setOfferReleasedDate] = useState(
    moment().format("DD MMM YYYY")
  );
  const [linkOfferingLetter, setOfferingLetter] = useState("");
  const [estPotentialRevenueMonth, setEstPRM] = useState(0);
  const [contractPeriod, setContractPeriod] = useState(0);
  const [totalContractValue, setContractValue] = useState(0);
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
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
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
  const [finalSalesStagesDate, setFinalSalesStagesDate] = useState(
    moment().format("19000101")
  );

  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const [locationImplementation, setLocationImplementation] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [totalDeviceUse, setTotalDeviceUse] = useState(0);
  const [cpNpwp, setCpNpwp] = useState("");
  const [cpPhoneOffice, setCpPhoneOffice] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [accountName, setAccountName] = useState("");
  const [emailDisbursementNotif, setEmailDisbursementNotif] = useState("");
  const [paymentChannel, setPaymentChannel] = useState([]);
  const [cpNik, setCpNik] = useState("");

  const [isTextEmpty, setIsTextEmpty] = useState(false);
  const [clickCR, setClickCR] = useState(false);
  const [openStatusReason, setOpenStatusReason] = useState(false);

  const [isTextMerchantNameEmpty, setIsTextMerchantNameEmpty] = useState(false);
  const [isTextCityEmpty, setIsTextCityEmpty] = useState(false);
  const [isTextAddressEmpty, setIsTextAddressEmpty] = useState(false);
  const [isTextPhoneEmpty, setIsTextPhoneEmpty] = useState(false);
  const [isTextCPNameEmpty, setIsTextCPNameEmpty] = useState(false);
  const [isTextCPAddressEmpty, setIsTextCPAddressEmpty] = useState(false);
  const [isTextCPPhoneEmpty, setIsTextCPPhoneEmpty] = useState(false);

  const [isProjectCtgrIdEmpty, setIsProjectCtgrIdEmpty] = useState(false);
  const [isAccountIdEmpty, setIsAccountIdEmpty] = useState(false);
  const [isPicCommercialIdEmpty, setIsPicCommercialIdEmpty] = useState(false);
  const [isProbabilityIdEmpty, setIsProbabilityIdEmpty] = useState(false);
  const [isSalesStageIdEmpty, setIsSalesStageIdEmpty] = useState(false);
  const [isSelectedBusinessesEmpty, setIsSelectedBusinessesEmpty] =
    useState(false);

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(Date.now());

  function formatDivisions() {
    const formattedDivisions = selectedDivisions.map((division) => ({
      divisionId: division.id,
      divisionCode: division.divisionCode,
    }));

    console.log("Formatted Divisions:", formattedDivisions);

    return formattedDivisions;
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
        accountId: form.accountId.value,
        projectCtgrId: form.projectCtgrId.value,
        probabilityId: form.probabilityId.value,
        picCommercialId: form.picCommercialId.value,
        picProjectId: form.picProjectId.value,
        salesStageId: form.salesStageId.value,
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
        cpNik,
        tags,
        remark,
        finalSalesStagesDate: moment(finalSalesStagesDate).format("YYYYMMDD"),
        reason,
        estLiveDate: moment(estLiveDate).format("YYYYMMDD"),
        actLiveDate: moment(actLiveDate).format("YYYYMMDD"),
        endContractDate: moment(endContractDate).format("YYYYMM"),
        businessCtgr: selectedBusinesses,
        division: formatDivisions(),
        locationImplementation,
        district,
        subDistrict,
        totalDeviceUse,
        cpNpwp,
        cpPhoneOffice,
        bankName,
        accountNo,
        accountName,
        emailDisbursementNotif,
        paymentChannel: paymentChannel,
      };

      const fieldsToCheck = [
        merchantName,
        city,
        address,
        phone,
        cpName,
        cpAddress,
        cpPhone,
        form.projectCtgrId.value,
        form.accountId.value,
        form.picCommercialId.value,
        form.probabilityId.value,
        form.salesStageId.value,
        selectedBusinesses,
      ];

      if (fieldsToCheck.some((field) => field === "")) {
        setIsTextMerchantNameEmpty(fieldsToCheck[0] === "");
        setIsTextCityEmpty(fieldsToCheck[1] === "");
        setIsTextAddressEmpty(fieldsToCheck[2] === "");
        setIsTextPhoneEmpty(fieldsToCheck[3] === "");
        setIsTextCPNameEmpty(fieldsToCheck[4] === "");
        setIsTextCPAddressEmpty(fieldsToCheck[5] === "");
        setIsTextCPPhoneEmpty(fieldsToCheck[6] === "");
        setIsProjectCtgrIdEmpty(fieldsToCheck[7] === -99);
        setIsAccountIdEmpty(fieldsToCheck[8] === -99);
        setIsPicCommercialIdEmpty(fieldsToCheck[9] === -99);
        setIsProbabilityIdEmpty(fieldsToCheck[10] === -99);
        setIsSalesStageIdEmpty(fieldsToCheck[11] === -99);
        setIsSelectedBusinessesEmpty(fieldsToCheck[12] === null);
      }

      // const fieldsIdToCheck = [
      //   accountId,
      //   form.projectCtgrId.value,
      //   picCommercialId,
      //   probabilityId,
      //   salesStageId,
      // ];

      // if (fieldsIdToCheck.some((field) => field === -99)) {
      //   setIsTextEmpty(true);
      // } else {
      //   setIsTextEmpty(false);
      // }

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

  async function saveEdit(reason) {
    try {
      console.log("projectCtgrId: ", form.projectCtgrId.value);
      console.log("Account: ", form.accountId.value);
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        id: dataSprint.id,
        sprintCode: dataSprint.sprintCode,
        sprintDate: sprintDate,
        projectCtgrId: form.projectCtgrId.value,
        // projectCtgrId: projectCtgrId,
        picCommercialId: form.picCommercialId.value,
        picProjectId: form.picProjectId.value,
        accountId: form.accountId.value,
        // accountId: accountId,
        merchantName: merchantName,
        country: country,
        province: province,
        city: city,
        phone: phone,
        zipCode: zipCode,
        longitude: longitude,
        latitude: latitude,
        address: address,
        cpName: cpName,
        cpPhone: cpPhone,
        cpEmail: cpEmail,
        cpDepartment: cpDepartment,
        cpAddress: cpAddress,
        cpNik: cpNik,
        probabilityId: form.probabilityId.value,
        salesStageId: form.salesStageId.value,
        trafficVisitor: trafficVisitor,
        offerReleasedDate: offerReleasedDate,
        estClosingDate: estClosingDate,
        actualClosingDate: actualClosingDate,
        estPotentialRevenueMonth: estPotentialRevenueMonth,
        totalContractValue: totalContractValue,
        estLiveDate: estLiveDate,
        actLiveDate: actLiveDate,
        endContractDate: endContractDate,
        tags: tags,
        remark: remark,
        businessCtgr: selectedBusinesses,
        reason: reason,
        finalSalesStagesDate: finalSalesStagesDate,
        // businessCtgr: selectedBusinesses.map((business) => business.id),
        locationImplementation: locationImplementation,
        district: district,
        subDistrict: subDistrict,
        totalDeviceUse: totalDeviceUse,
        cpNpwp: cpNpwp,
        cpPhoneOffice: cpPhoneOffice,
        bankName: bankName,
        accountNo: accountNo,
        accountName: accountName,
        emailDisbursementNotif: emailDisbursementNotif,
        paymentChannel: paymentChannel,
      };
      // const response = await fetch(`${config.api_ptms}/sprint/edit`, {
      //   method: "POST",
      //   headers: headers,
      //   body: JSON.stringify(data),
      // });
      const response = await fetch(
        // `http://192.168.1.205:8081/ptms/sprint/edit`,
        `${config.api_ptms}/sprint/edit`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        }
      );
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
  }

  async function changeRequest(reason) {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        id: dataSprint.id,
        reason: reason,
      };

      const response = await fetch(
        `${config.api_ptms}/sprint/changes-request`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );

      const responseJSON = await response.json();

      if (response.ok) {
        console.log(responseJSON.meta.message);
        setNotif("success", responseJSON.meta.message);
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

  async function confirmed(reason) {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        id: dataSprint.id,
        reason: reason,
      };

      const response = await fetch(`${config.api_ptms}/sprint/confirm`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        console.log(responseJSON.meta.message);
        setNotif("success", responseJSON.meta.message);
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
    setprojectCtgrId(-99);
    setProbabilityId(-99);
    setPicCommId(-99);
    setPicrojectId(-99);
    setSalesStageId(-99);
    setTrafficVisitor("");
    setOfferReleasedDate("");
    setOfferingLetter("");
    setContractPeriod(0);
    setContractValue(0);
    setEstClosing("");
    setActClosing("");
    setMerchantName("");
    setAddress("");
    setPhone("");
    setCountry("");
    setProvince("");
    setCity("");
    setZipCode("");
    setLongitude(0);
    setLatitude(0);
    setCpName("");
    setCpAddress("");
    setCpPhone("");
    setCpEmail("");
    setCpDepartment("");
    setCpNik("");
    setTags("");
    setRemark("");
    setEstPRM(0);
    setEstLiveDate("");
    setActLiveDate("");
    setEndContractDate("");
    setFinalSalesStagesDate("");
  };

  const goToLink = () => {
    statusOpenViaDivision(false);
    navigate("/sprint/link-sprint");
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

  const addDivisionToTable = () => {
    if (selectedDivisionToAdd) {
      setSelectedDivisions((prevSelectedDivisions) => {
        const isDuplicate = prevSelectedDivisions.some(
          (item) => item.id === selectedDivisionToAdd.id
        );

        if (isDuplicate) {
          setNotif(
            "warning",
            "Division with this ID already exists in the table."
          );
          return prevSelectedDivisions;
        } else {
          const updatedDivisions = [
            ...prevSelectedDivisions,
            selectedDivisionToAdd,
          ];
          console.log("Updated Divisions:", updatedDivisions);
          return updatedDivisions;
        }
      });

      setSelectedDivisionToAdd(null);
      setDivisionId("");
      setDropdownKey(Date.now()); // Memperbarui dropdownKey
    }
  };

  // const addDivisionToTableStatic = () => {
  //   if (selectedDivisionToAdd) {
  //     setDivisionSprint((divisionSprint) => {
  //       if (
  //         divisionSprint.some((item) => item.id === selectedDivisionToAdd.id)
  //       ) {
  //         alert("Division with this ID already exists in the table.");
  //         return divisionSprint;
  //       } else {
  //         return [...divisionSprint, selectedDivisionToAdd];
  //       }
  //     });
  //     setSelectedDivisionToAdd(null);
  //     setDivisionId("");
  //     setResetDropdown(true);
  //   }
  // };

  const addDivisionToTableForAPi = () => {
    if (divisionId !== "") {
      if (Array.isArray(divisionSprint)) {
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
        }
      } else if (divisionSprint === null) {
        saveDataDivisionSprint();
      } else {
        console.error("divisionSprint is not an array");
      }
    }
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
        getDataDivisionList();
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const getDataDivisionList = async () => {
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

  const deleteDataDivision = async () => {
    console.log(isEditing);
    if (isEditing) {
      deleteData();
    } else {
      removeDivisionFromTable(id);
    }
  };

  const deleteData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_ptms}/sprint/division/remove/${id}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(`Data has been deleted successfully.`);
        getDataDivisionList();
        setNotif(
          "success",
          "The data has been successfully deleted from the database."
        );
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const removeDivisionFromTable = (id) => {
    setDivisionSprint((divisionSprint) => {
      return divisionSprint.filter((item) => item.id !== id);
    });
  };

  const calculatePct = (todo, inProgress, done, status) => {
    const total = todo + inProgress + done;
    if (total === 0) {
      return 0;
    } else {
      let percentage;
      if (status === "inProgress") {
        percentage = (inProgress / total) * 100;
      } else if (status === "done") {
        percentage = (done / total) * 100;
      }

      // Pengecekan untuk pembulatan ke bawah atau ke atas
      if (percentage % 1 < 0.5) {
        return Math.floor(percentage);
      } else {
        return Math.ceil(percentage);
      }
    }
  };

  const handleBusinessChange = (selectedValues) => {
    setSelectedBusinesses(selectedValues);
  };

  const handlePaymentChange = (selectedPayment) => {
    setPaymentChannel(selectedPayment);
  };

  const handleClick = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDataMenu({});
  };

  const handleCheck = () => {
    console.log("Data Sprint: ", dataSprint);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleClickTask = () => {
    statusOpenViaDivision(false);
    navigate("/sprint/taskDivision");
  };

  const fetchData = async () => {
    setLoadingState(true);
    // setDetailSprint({});
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
        const a = [];
        if (data.result.sprint.business_ctgr != "") {
          const array = data.result.sprint.business_ctgr.split(", ");
          for (let index = 0; index < array.length; index++) {
            const element = parseInt(array[index]);
            a.push(element);
          }
        }

        console.log(selectedBusinesses);
        setForm({
          accountId: {
            label: data.result.sprint.accountName,
            value: data.result.sprint.accountId,
          },
          projectCtgrId: {
            label:
              data.result.sprint.projectCtgrCode +
              "  -  " +
              data.result.sprint.projectCtgrName,
            value: data.result.sprint.projectCtgrId,
          },
          picCommercialId: {
            label:
              data.result.sprint.picCommercialCode +
              "  -  " +
              data.result.sprint.picCommercialName,
            value: data.result.sprint.picCommercialId,
          },
          picProjectId: {
            label:
              data.result.sprint.picProjectCode +
              "  -  " +
              data.result.sprint.picProjectName,
            value: data.result.sprint.picProjectId,
          },
          // salesStageId: {
          //   label:
          //     data.result.sprint.salesStagesName +
          //     "(" +
          //     data.result.sprint.salesStagesCode +
          //     ")",
          //   value: data.result.sprint.salesStageId,
          // },
          salesStageId: {
            label:
              data.result.sprint.salesStagesName +
              "  -  " +
              data.result.sprint.salesStagesDesc,
            value: data.result.sprint.salesStageId,
          },
          probabilityId: {
            label:
              data.result.sprint.probabilityName +
              "  -  " +
              data.result.sprint.probabilityDesc,
            value: data.result.sprint.probabilityId,
          },
        });
        setSprintDate(data.result.sprint.sprintDate);
        setSprintCode(data.result.sprint.sprintCode);
        setprojectCtgrId(data.result.sprint.projectCtgrId);
        setSelectedBusinesses(a);
        setPicCommId(data.result.sprint.picCommercialId);
        setPicrojectId(data.result.sprint.picProjectId);
        setAccountId(data.result.sprint.accountId);
        setProbabilityId(data.result.sprint.probabilityId);
        setSalesStageId(data.result.sprint.salesStageId);
        setTrafficVisitor(data.result.sprint.trafficVisitor);
        setOfferReleasedDate(data.result.sprint.offerReleasedDate);
        setMerchantName(data.result.merchant.merchantName);
        setCountry(data.result.merchant.country);
        setProvince(data.result.merchant.province);
        setCity(data.result.merchant.city);
        setPhone(data.result.merchant.phone);
        setZipCode(data.result.merchant.zipCode);
        setLongitude(data.result.merchant.longitude);
        setLatitude(data.result.merchant.latitude);
        setAddress(data.result.merchant.address);
        setCpName(data.result.merchantCp.cpName);
        setCpPhone(data.result.merchantCp.cpPhone);
        setCpEmail(data.result.merchantCp.cpEmail);
        setCpDepartment(data.result.merchantCp.cpDepartment);
        setCpAddress(data.result.merchantCp.cpAddress);
        setCpNik(data.result.merchantCp.cpNik);
        setDivisionSprint(data.result.sprintDivision);
        setEstClosing(data.result.sprint.estClosingDate);
        setActClosing(data.result.sprint.actualClosingDate);
        setEstPRM(data.result.sprint.estPotentialRevenueMonth);
        setContractValue(data.result.sprint.totalContractValue);
        setEstLiveDate(data.result.sprint.estLiveDate);
        setActLiveDate(data.result.sprint.actLiveDate);
        setEndContractDate(data.result.sprint.endContractDate);
        setFinalSalesStagesDate(data.result.sprint.finalSalesStagesDate);
        setTags(data.result.sprint.tags);
        setRemark(data.result.sprint.remark);
        setNotif("success", data.meta.message);
        // setPaymentChannel(data.result.merchant.paymentChannel);
        if (data.result.merchant.paymentChannel) {
          const separatedChannels =
            data.result.merchant.paymentChannel.split(", ");
          setPaymentChannel(separatedChannels);
        }
        setLocationImplementation(data.result.merchant.locationImplementation);
        setDistrict(data.result.merchant.district);
        setSubDistrict(data.result.merchant.subDistrict);
        setTotalDeviceUse(data.result.merchant.totalDeviceUse);

        setCpNpwp(data.result.merchantCp.cpNpwp);
        setCpPhoneOffice(data.result.merchantCp.cpPhoneOffice);

        setBankName(data.result.merchantBank.bankName);
        setAccountNo(data.result.merchantBank.accountNo);
        setAccountName(data.result.merchantBank.accountName);
        setEmailDisbursementNotif(
          data.result.merchantBank.emailDisbursementNotif
        );
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

  const merchantNameChange = (e) => {
    const value = e.target.value;
    setMerchantName(value);
    setIsTextEmpty(value === "");
  };

  const countryChange = (e) => {
    const value = e.target.value;
    setCountry(value);
    setIsTextEmpty(value === "");
  };

  useEffect(() => {
    if (isEditing) {
      // hit API get detail sprint;
      fetchData();
      getDataDivisionList();
      console.log("data Sprint : ", dataSprint);
    }
  }, [isEditing]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            <div className="flex justify-center items-center min-top-screen mb-10">
              <div className="w-full">
                <div className="bg-white shadow-lg overflow-hidden border border-slate-200 rounded-2xl">
                  <div className="px-6 py-4">
                    {/* BUTTON TOP */}
                    <div className="flex mb-6 mt-2 justify-between">
                      <div>
                        <div className="text-2xl font-semibold text-center">
                          {isEditing ? "Edit Sprint" : "Create Sprint"}
                        </div>
                      </div>
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
                            <div className={isEditing ? "m-1.5" : "hidden"}>
                              <Button
                                type="tertiary"
                                iconName={faEye}
                                text="History"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHistoryModalOpen(true);
                                }}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={isEditing ? faCheck : faFloppyDisk}
                                text={isEditing ? "Update" : "Save"}
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
                    {/* ROW 0 */}
                    <div className=" px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Sprint No"
                          placeholder="Input any Sprint Number"
                          value={sprintCode}
                          onChange={(e) => setSprintCode(e.target.value)}
                          type="standard"
                          readOnly={isEditing ? true : false}
                          helperText="If left blank, the Sprint Number will be automatically generated by the system."
                        />
                      </div>
                      <div className="w-1/2"></div>
                    </div>
                    {/* ROW 1 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <DatePickerNew
                          label="Sprint Date"
                          value={sprintDate}
                          onChange={(value) =>
                            setSprintDate(removeDashesFromDate(value))
                          }
                          placeholder="Select Sprint Date"
                        />
                      </div>
                      <div className="w-1/2 mt-1.5">
                        <PackageDropdown
                          value={form.projectCtgrId}
                          onChange={(value) => {
                            setForm({
                              ...form,
                              projectCtgrId: value ?? {
                                label: "-",
                                value: -99,
                              },
                            });
                            setIsTextEmpty(false); // Reset isTextEmpty when the dropdown value changes
                          }}
                          filter={false}
                          helperText={
                            isProjectCtgrIdEmpty
                              ? "Project Category is required"
                              : ""
                          }
                          errorText={isProjectCtgrIdEmpty}
                        />
                      </div>
                    </div>
                    {/* ROW CHECKBOX 1 */}
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
                            helperText={
                              isSelectedBusinessesEmpty
                                ? "Business is required. Please select at least one. "
                                : ""
                            }
                            errorText={isSelectedBusinessesEmpty}
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
                              key={dropdownKey}
                              onChange={(selectedValue) => {
                                setDivisionId(parseInt(selectedValue));
                                setResetDropdown(false);
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
                            <div className="flex justify-start mt-1.5">
                              <div className="mr-2">
                                <Button
                                  type="primary"
                                  iconName={faPlus}
                                  text="Add Division"
                                  onClick={
                                    isEditing
                                      ? addDivisionToTableForAPi
                                      : addDivisionToTable
                                  }
                                />
                              </div>
                              <div className={isEditing ? "hidden" : "hidden"}>
                                <Button
                                  type="primary"
                                  iconName={faPlus}
                                  text="Add Link"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    goToLink();
                                  }}
                                />
                              </div>
                            </div>
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
                              {isEditing ? (
                                <tbody>
                                  {divisionSprint ? (
                                    divisionSprint.map((division) => (
                                      <tr key={division.id}>
                                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                          <div className="flex justify-start items-center">
                                            <div>
                                              <Button
                                                type="icon"
                                                iconName={faTrash}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setId(division.id);
                                                  setValidDelModalOpen(true);
                                                }}
                                              />
                                            </div>
                                            <div
                                              className={
                                                !isEditing ? "invisible" : ""
                                              }>
                                              <Button
                                                type="icon"
                                                iconName={faListCheck}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setNewDivisionId(division);
                                                  setNewTaskSprint(dataSprint);
                                                  handleClickTask();
                                                }}
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
                                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                          <div className="text-xs font-bold">
                                            <MultiProgress
                                              elements={[
                                                {
                                                  value: !isEditing
                                                    ? 0
                                                    : calculatePct(
                                                        division.todo,
                                                        division.inProgress,
                                                        division.done,
                                                        "done"
                                                      ),
                                                  color: "#00b300",
                                                  showPercentage: true,
                                                  textColor: "white",
                                                  fontSize: 10,
                                                  isBold: false,
                                                  className:
                                                    "my-custom-css-class",
                                                },
                                                {
                                                  value: !isEditing
                                                    ? 0
                                                    : calculatePct(
                                                        division.todo,
                                                        division.inProgress,
                                                        division.done,
                                                        "inProgress"
                                                      ),
                                                  color: "#d5d900",
                                                  showPercentage: true,
                                                  fontSize: 10,
                                                  textColor: "white",
                                                  isBold: true,
                                                },
                                              ]}
                                              height={13}
                                              backgroundColor="#e4e4e4"
                                            />
                                            <Box sx={{ minWidth: 35 }}>
                                              <Typography
                                                variant="body2"
                                                color="text.secondary">
                                                <div className="flex justify-between">
                                                  <div className="text-[9px] font-bold">
                                                    <FontAwesomeIcon
                                                      icon={faSquare}
                                                      style={{
                                                        color: "#e4e4e4",
                                                      }}
                                                    />
                                                    <span className="ml-1">
                                                      ToDo
                                                    </span>
                                                  </div>
                                                  <div className="text-[9px] font-bold">
                                                    <FontAwesomeIcon
                                                      icon={faSquare}
                                                      style={{
                                                        color: "#d5d900",
                                                      }}
                                                    />
                                                    <span className="ml-1">
                                                      In Progress
                                                    </span>
                                                  </div>
                                                  <div className="text-[9px] font-bold">
                                                    <FontAwesomeIcon
                                                      icon={faSquare}
                                                      style={{
                                                        color: "#00b300",
                                                      }}
                                                    />
                                                    <span className="ml-1">
                                                      Done
                                                    </span>
                                                  </div>
                                                </div>
                                              </Typography>
                                            </Box>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        <div className="text-xs font-bold">
                                          No Data Available
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              ) : (
                                <tbody>
                                  {selectedDivisions &&
                                  selectedDivisions.length > 0 ? (
                                    selectedDivisions.map((division) => (
                                      <tr key={division.id}>
                                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                          <div className="flex justify-start items-center">
                                            <div>
                                              <Button
                                                type="icon"
                                                iconName={faTrash}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setId(division.id);
                                                  setValidDelModalOpen(true);
                                                }}
                                              />
                                            </div>
                                            <div
                                              className={
                                                !isEditing ? "invisible" : ""
                                              }>
                                              <Button
                                                type="icon"
                                                iconName={faListCheck}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setNewDivisionId(division);
                                                  setNewTaskSprint(dataSprint);
                                                  handleClickTask();
                                                }}
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
                                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                          <div className="text-xs font-bold">
                                            <MultiProgress
                                              elements={[
                                                {
                                                  value: !isEditing
                                                    ? 0
                                                    : calculatePct(
                                                        division.todo,
                                                        division.inProgress,
                                                        division.done,
                                                        "done"
                                                      ),
                                                  color: "#00b300",
                                                  showPercentage: true,
                                                  textColor: "white",
                                                  fontSize: 10,
                                                  isBold: false,
                                                  className:
                                                    "my-custom-css-class",
                                                },
                                                {
                                                  value: !isEditing
                                                    ? 0
                                                    : calculatePct(
                                                        division.todo,
                                                        division.inProgress,
                                                        division.done,
                                                        "inProgress"
                                                      ),
                                                  color: "#d5d900",
                                                  showPercentage: true,
                                                  fontSize: 10,
                                                  textColor: "white",
                                                  isBold: true,
                                                },
                                              ]}
                                              height={13}
                                              backgroundColor="#e4e4e4"
                                            />
                                            <Box sx={{ minWidth: 35 }}>
                                              <Typography
                                                variant="body2"
                                                color="text.secondary">
                                                <div className="flex justify-between">
                                                  <div className="text-[9px] font-bold">
                                                    <FontAwesomeIcon
                                                      icon={faSquare}
                                                      style={{
                                                        color: "#e4e4e4",
                                                      }}
                                                    />
                                                    <span className="ml-1">
                                                      ToDo
                                                    </span>
                                                  </div>
                                                  <div className="text-[9px] font-bold">
                                                    <FontAwesomeIcon
                                                      icon={faSquare}
                                                      style={{
                                                        color: "#d5d900",
                                                      }}
                                                    />
                                                    <span className="ml-1">
                                                      In Progress
                                                    </span>
                                                  </div>
                                                  <div className="text-[9px] font-bold">
                                                    <FontAwesomeIcon
                                                      icon={faSquare}
                                                      style={{
                                                        color: "#00b300",
                                                      }}
                                                    />
                                                    <span className="ml-1">
                                                      Done
                                                    </span>
                                                  </div>
                                                </div>
                                              </Typography>
                                            </Box>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                        <div className="text-xs font-bold">
                                          No Data Available
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              )}
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
                          value={form.picCommercialId}
                          onChange={(value) => {
                            setForm({
                              ...form,
                              picCommercialId: value ?? {
                                label: "-",
                                value: -99,
                              },
                            });
                          }}
                          helperText={
                            isPicCommercialIdEmpty
                              ? "PIC Commercial is required"
                              : ""
                          }
                          errorText={isPicCommercialIdEmpty}
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <PicProjDropdown
                          value={form.picProjectId}
                          onChange={(event, value) => {
                            setForm({
                              ...form,
                              picProjectId: value ?? {
                                label: "-",
                                value: -99,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                    {/* ROW 3 */}
                    <div className="flex justify-between px-8">
                      <div
                        className={
                          form.salesStageId.label.substring(0, 11) ===
                            "CLOSED LOST" ||
                          form.salesStageId.label.substring(0, 10) ===
                            "CLOSED WON"
                            ? "w-1/2 mt-2.5"
                            : "w-full mt-2.5"
                        }>
                        <SalesStageDropdown
                          value={form.salesStageId}
                          onChange={(value) => {
                            setForm({
                              ...form,
                              salesStageId: value ?? {
                                label: "-",
                                value: -99,
                              },
                            });
                          }}
                          helperText={
                            isSalesStageIdEmpty ? "Sales Stage is required" : ""
                          }
                          errorText={isSalesStageIdEmpty}
                        />
                      </div>
                      <div
                        className={
                          form.salesStageId.label.substring(0, 11) ===
                            "CLOSED LOST" ||
                          form.salesStageId.label.substring(0, 10) ===
                            "CLOSED WON"
                            ? "w-1/2 ml-8 mt-0.5"
                            : "hidden"
                        }>
                        <DatePickerNew
                          label="Final Sales Stage Date"
                          value={finalSalesStagesDate}
                          onChange={(value) =>
                            setFinalSalesStagesDate(removeDashesFromDate(value))
                          }
                          placeholder="Select Final Sales Stage Date"
                        />
                      </div>
                    </div>
                    {/* ROW 4 */}
                    <div className="flex justify-between px-8 mt-2">
                      <div className="w-1/2 mr-8 mt-2">
                        <ProbabilityDropdown
                          // value={probabilityId}
                          // onChange={(selectedValue) =>
                          //   setProbabilityId(parseInt(selectedValue))
                          // }
                          // type="standard"
                          value={form.probabilityId}
                          onChange={(value) => {
                            setForm({
                              ...form,
                              probabilityId: value ?? {
                                label: "-",
                                value: -99,
                              },
                            });
                          }}
                          helperText={
                            isProbabilityIdEmpty
                              ? "Probability is required"
                              : ""
                          }
                          errorText={isProbabilityIdEmpty}
                        />
                      </div>

                      <div className="w-1/2 mt-2">
                        {/* <AccountDropdown
                          value={accountId}
                          onChange={(value) => setAccountId(parseInt(value))}
                          type="standard"
                        /> */}
                        <AccountDropdown
                          // defaultValue={accountId}
                          value={form.accountId}
                          // onChange={(defaultValue) =>
                          //   setAccountId(parseInt(defaultValue))
                          // }
                          onChange={(value) => {
                            setForm({
                              ...form,
                              accountId: value ?? {
                                label: "-",
                                value: -99,
                              },
                            });
                          }}
                          helperText={
                            isAccountIdEmpty ? "Account is required" : ""
                          }
                          errorText={isAccountIdEmpty}
                        />
                      </div>
                    </div>
                    {/* ROW 5 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mt-3">
                        <TextFieldGlobal
                          label="Merchant Name"
                          placeholder="Input any Name for Merchant"
                          value={merchantName}
                          onChange={(e) => setMerchantName(e.target.value)}
                          type="standard"
                          helperText={
                            isTextMerchantNameEmpty
                              ? "Merchant Name is required"
                              : ""
                          }
                          errorText={isTextMerchantNameEmpty}
                        />
                      </div>
                      <div className="w-1/2 ml-8 mt-2.5">
                        <TextFieldGlobal
                          label="Country"
                          placeholder="Input Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 6 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mt-2.5">
                        <TextFieldGlobal
                          label="Province"
                          placeholder="Input Province"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 ml-8 mt-2.5">
                        <TextFieldGlobal
                          label="City"
                          placeholder="Input City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          type="standard"
                          helperText={isTextCityEmpty ? "City is required" : ""}
                          errorText={isTextCityEmpty}
                        />
                      </div>
                    </div>
                    {/* ROW 7 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mt-2.5 mr-4">
                        <TextFieldGlobal
                          label="District"
                          placeholder="Input District"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2.5 ml-4">
                        <TextFieldGlobal
                          label="Sub District"
                          placeholder="Input Sub District"
                          value={subDistrict}
                          onChange={(e) => setSubDistrict(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* NEW ROW 1 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mt-2.5 mr-4">
                        <TextFieldGlobal
                          label="Phone"
                          placeholder="Input Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="standard"
                          helperText={
                            isTextPhoneEmpty ? "Phone Number is required" : ""
                          }
                          errorText={isTextPhoneEmpty}
                        />
                      </div>
                      <div className="w-1/2 mt-2.5 ml-4">
                        <TextFieldGlobal
                          label="Zip Code"
                          placeholder="Input Zip Code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 8 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-2.5">
                        <TextFieldNumberGlobal
                          label="Longitude"
                          placeholder="Example: 38.8951"
                          value={longitude}
                          onChange={(e) =>
                            setLongitude(parseInt(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2.5">
                        <TextFieldNumberGlobal
                          label="Latitude"
                          placeholder="Example: -77.0364"
                          value={latitude}
                          onChange={(e) =>
                            setLatitude(parseInt(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* NEW ROW 2 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Location Implementation"
                          placeholder="Input Location Implementation"
                          value={locationImplementation || ""}
                          onChange={(e) =>
                            setLocationImplementation(e.target.value)
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* NEW ROW 3 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Total Device Use"
                          placeholder="Input Total Device Use"
                          value={totalDeviceUse || ""}
                          onChange={(e) =>
                            setTotalDeviceUse(parseInt(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 9 */}
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
                          helperText={
                            isTextAddressEmpty ? "Address is required" : ""
                          }
                          errorText={isTextAddressEmpty}
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
                        {/* ROW 10 */}
                        <div className="flex justify-between px-2 mt-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="NIK"
                              placeholder="Input NIK"
                              value={cpNik || ""}
                              onChange={(e) => setCpNik(e.target.value)}
                              type="standard"
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Name"
                              placeholder="Input any Name for Contact Person"
                              value={cpName || ""}
                              onChange={(e) => setCpName(e.target.value)}
                              type="standard"
                              helperText={
                                isTextCPNameEmpty ? "Name is required" : ""
                              }
                              errorText={isTextCPNameEmpty}
                            />
                          </div>
                        </div>
                        {/* ROW 11 */}
                        <div className="flex justify-between px-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Phone"
                              placeholder="Input Contact Person Phone Number"
                              value={cpPhone || ""}
                              onChange={(e) => setCpPhone(e.target.value)}
                              type="standard"
                              helperText={
                                isTextCPPhoneEmpty
                                  ? "Contact Person Phone Number is required"
                                  : ""
                              }
                              errorText={isTextCPPhoneEmpty}
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Email"
                              placeholder="Input Contact Person E-Mail"
                              value={cpEmail || ""}
                              onChange={(e) => setCpEmail(e.target.value)}
                              type="standard"
                            />
                          </div>
                        </div>
                        {/* NEW ROW 4 */}
                        <div className="flex justify-between px-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Department"
                              placeholder="Input Department of Contact Person"
                              value={cpDepartment || ""}
                              onChange={(e) => setCpDepartment(e.target.value)}
                              type="standard"
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="NPWP"
                              placeholder="Input Contact Person NPWP ID"
                              value={cpNpwp || ""}
                              onChange={(e) => setCpNpwp(e.target.value)}
                              type="standard"
                            />
                          </div>
                        </div>
                        {/* NEW ROW 5 */}
                        <div className="flex justify-between px-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Phone Office"
                              placeholder="Input Contact Person Phone Office"
                              value={cpPhoneOffice || ""}
                              onChange={(e) => setCpPhoneOffice(e.target.value)}
                              type="standard"
                            />
                          </div>
                          <div className="w-1/2 mt-2"></div>
                        </div>
                        {/* ROW 12 */}
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
                              helperText={
                                isTextCPAddressEmpty
                                  ? "Contact Person Address is required"
                                  : ""
                              }
                              errorText={isTextCPAddressEmpty}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ROW 13 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8 mt-3">
                        <TextFieldNumberGlobal
                          label="Traffic Visitor"
                          placeholder="Input Number of Traffic Visitor"
                          value={trafficVisitor}
                          onChange={(e) =>
                            setTrafficVisitor(parseInt(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2">
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
                        <TextFieldNumberGlobal
                          label="Est. Potential Revenue of Month"
                          placeholder="Input Amount of Estimate Potential Revenue of Month"
                          value={estPotentialRevenueMonth}
                          onChange={(e) => setEstPRM(parseInt(e.target.value))}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldNumberGlobal
                          label="Total Revenue"
                          placeholder="Input Amount of Contract Value"
                          value={totalContractValue}
                          onChange={(e) =>
                            setContractValue(parseInt(e.target.value))
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 16 */}
                    <div className="flex justify-between px-8">
                      <div className="w-1/2 mr-8">
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
                        <DatePickerMonth
                          label="End Contract"
                          value={endContractDate}
                          onChange={(value) =>
                            setEndContractDate(removeDashesFromDate(value))
                          }
                          placeholder="Select End Contract"
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Tags"
                          placeholder="Enter any Tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* NEW CARD */}
                    <div className="justify-between px-8 mt-2 mb-2 rounded-xl">
                      <div
                        className="mb-1 text-sm font-bold"
                        style={{ color: "#737379" }}>
                        Bank Disbursement
                      </div>
                      <div className="w-full border border-gray-400 px-2 rounded-xl">
                        {/* ROW NEW CARD 1 */}
                        <div className="flex justify-between px-2 mt-2">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Bank Name"
                              placeholder="Input any Name for Bank"
                              value={bankName || ""}
                              onChange={(e) => setBankName(e.target.value)}
                              type="standard"
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Email Notification"
                              placeholder="Input Email for Notification"
                              value={emailDisbursementNotif || ""}
                              onChange={(e) =>
                                setEmailDisbursementNotif(e.target.value)
                              }
                              type="standard"
                            />
                          </div>
                        </div>
                        {/* ROW NEW CARD 2 */}
                        <div className="flex justify-between px-2 mb-4">
                          <div className="w-1/2 mr-8 mt-2">
                            <TextFieldGlobal
                              label="Account No."
                              placeholder="Input Account Number"
                              value={accountNo || ""}
                              onChange={(e) => setAccountNo(e.target.value)}
                              type="standard"
                            />
                          </div>
                          <div className="w-1/2 mt-2">
                            <TextFieldGlobal
                              label="Account Name"
                              placeholder="Input any Name Account"
                              value={accountName || ""}
                              onChange={(e) => setAccountName(e.target.value)}
                              type="standard"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ROW CHECKBOX 2 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-3">
                        <div
                          className="text-sm font-bold"
                          style={{ color: "#737379" }}>
                          Select Payment Method
                        </div>
                        <div className="ml-0.5">
                          <MicrositeCheckBox
                            onChange={(selectedPayment) =>
                              setPaymentChannel(selectedPayment)
                            }
                            selectedPayment={paymentChannel}
                          />
                        </div>
                      </div>
                    </div>
                    {/* ROW 18 */}
                    <div className="flex justify-between px-8">
                      <div className="w-full mt-2.5">
                        <TextFieldGlobal
                          label="Remark"
                          placeholder="Enter any Remark"
                          value={remark}
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
                            <div className="m-1.5 hidden">
                              <Button
                                type="tertiary"
                                text="Check"
                                onClick={handleCheck}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="tertiary"
                                iconName={faArrowLeft}
                                text="Back"
                                onClick={closePage}
                              />
                            </div>
                            <div
                              className={
                                dataSprint.statusConfirmMerchant === "O"
                                  ? "visible"
                                  : "hidden"
                              }>
                              <div className={isEditing ? "m-1.5" : "hidden"}>
                                <Button
                                  type="danger"
                                  text="Change Request"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setClickCR(true);
                                    setOpenStatusReason(true);
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className={
                                dataSprint.statusConfirmMerchant === "O"
                                  ? "visible"
                                  : "hidden"
                              }>
                              <div className={isEditing ? "m-1.5" : "hidden"}>
                                <Button
                                  type="success"
                                  text="Confirmed"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setClickCR(false);
                                    setOpenStatusReason(true);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={isEditing ? faCheck : faFloppyDisk}
                                text={isEditing ? "Update" : "Save"}
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
        isEditing={isEditing}
        saveEdit={saveEdit}
      />
      <ModalReasonStatus
        modalOpen={openStatusReason}
        setModalOpen={setOpenStatusReason}
        clickCR={clickCR}
        changeRequest={changeRequest}
        confirmed={confirmed}
      />
      <SprintValid
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        deleteDataDivision={deleteDataDivision}
      />
      <SprintModalHistory
        modalOpen={historyModalOpen}
        setModalOpen={setHistoryModalOpen}
        dataSprint={dataSprint}
      />
    </div>
  );
}

export default SprintAdd;
