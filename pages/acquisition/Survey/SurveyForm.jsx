import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faPenToSquare,
  faTrash,
  faFloppyDisk,
  faArrowLeft,
  faPlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import { useStateContext } from "../../../ContextProvider";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import Button from "../../../components/Button";
import config from "../../../../config";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import DatePickerNew from "../../../components/DatePickerNew";
import ModalReason from "../../../components/ModalReason";
import WysiwygGlobal from "../../../components/WysiwygGlobal";
import SwitchGlobal from "../../../components/SwitchGlobal";
import ListItemGlobal from "../../../components/ListItemGlobal";
import {
  Menu,
  MenuList,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import CustomTable from "../../../components/CustomTable";
import SurveyNote from "./SurveyNote";
import SurveyDetailModal from "./SurveyDetailModal";
import SurveyHardwareModal from "./SurveyHardwareModal";
import SurveyValidation from "./SurveyValidation";
import BadgeGlobal from "../../../components/BadgeGlobal";
import WysiwygReadOnlyGlobal from "../../../components/WysiwygReadOnlyGlobal";

export default function SurveyForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setLoadingState, setNotif, isEditing, dataEdit, surveyPack } =
    useStateContext();
  const navigate = useNavigate();
  const [listDetail, setListDetail] = useState([]);
  const [listHardware, seTListHardware] = useState([]);
  const [listNote, setListNote] = useState([]);
  const tableDataDetail = listDetail;
  const tableDataHardware = listHardware;
  const [dataMenuDetail, setDataMenuDetail] = useState({});
  const [dataMenuHardware, setDataMenuHardware] = useState({});
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorElHardware, setAnchorElHardware] = React.useState(null);
  const openHardware = Boolean(anchorElHardware);
  const [docNo, setDocNo] = useState("");
  const [docDate, setDocDate] = useState(moment().format("DD MMM YYYY"));
  const [surveyDate, setSurveyDate] = useState(moment().format("DD MMM YYYY"));
  const [picSurvey, setPicSurvey] = useState("");
  const [sprintId, setSprintId] = useState(-99);
  const [internetAvailability, setInternetAvailability] = useState("");
  const [internetAvailabilityRemark, setInternetAvailabilityRemark] =
    useState("");
  const [pln, setPln] = useState("");
  const [plnRemark, setPlnRemark] = useState("");
  const [operationHours, setOperationHours] = useState("");
  const [operationHoursRemark, setOperationHoursRemark] = useState("");
  const [existingSystem, setExistingSystem] = useState("");
  const [clientNeeds, setClientNeeds] = useState("");
  const [solution, setSolution] = useState("");
  const [civilProject, setCivilProject] = useState("");
  const [tags, setTags] = useState("");
  const [remark, setRemark] = useState("");
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalHardware, setOpenModalHardware] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [dataEditDetail, setDataEditDetail] = useState({});
  const [editNote, setEditNote] = useState(false);
  const [editHardware, setEditHardware] = useState(false);
  const [dataEditHardware, setDataEditHardware] = useState({});
  const [openValidDel, setOpenValidDel] = useState(false);
  const [isDetail, setIsDetail] = useState(true);
  const [isNote, setIsNote] = useState(true);
  const [dataDetailDelete, setDataDetailDelete] = useState({});
  const [idDetailLocal, setIdDetailLocal] = useState({});
  const [dataHardwareDelete, setDataHardwareDelete] = useState({});
  const [idLocal, setIdLocal] = useState({});
  const [noteEdit, setNoteEdit] = useState({});

  const hardwareLocal = (hardwareName, qty, flgAdditional, remark) => {
    const obj = {
      id: listHardware.length + 1,
      hardwareName: hardwareName,
      qty: qty,
      flgAdditional: flgAdditional,
      remark: remark,
    };
    if (listHardware.some((item) => item.hardwareName === obj.hardwareName)) {
      alert("Hardware with this name already exists in the table.");
      return listHardware;
    } else {
      listHardware.push(obj);
    }
    console.log("ListHardware: ", listHardware);
  };

  const DetailLocal = (
    projectCtgrId,
    parameterTitle,
    parameterValue,
    remark,
    flgAdditional
  ) => {
    const objectDetail = {
      id: listDetail.length + 1,
      projectCtgrId: surveyPack.projectCtgrId,
      parameterTitle: parameterTitle,
      parameterValue: parameterValue,
      remark: remark,
      flgAdditional: flgAdditional,
    };
    if (
      listDetail.some(
        (item) => item.parameterTitle === objectDetail.parameterTitle
      )
    ) {
      alert("Parameter with this title already exists in the table.");
      return listDetail;
    } else {
      listDetail.push(objectDetail);
    }
    console.log("listDetail: ", listDetail);
  };

  const noteLocal = (notesTittle, notes) => {
    const ObjectNotes = {
      id: listNote.length + 1,
      notesTittle: notesTittle,
      notes: notes,
    };
    if (listNote.some((item) => item.notesTittle === ObjectNotes.notesTittle)) {
      alert("Note with this title already exists in the table.");
      return listNote;
    } else {
      listNote.push(ObjectNotes);
    }
    console.log("listNote: ", listNote);
  };

  const deleteDataHardwareLocal = (id) => {
    seTListHardware((listHardware) => {
      return listHardware.filter((item) => item.id !== id);
    });
    console.log("TEST");
  };

  const deleteDataDetailLocal = (id) => {
    setListDetail((listDetail) => {
      return listDetail.filter((item) => item.id !== id);
    });
  };

  const deleteDataNoteLocal = (id) => {
    setListNote((listNote) => {
      return listNote.filter((item) => item.id !== id);
    });
  };

  const saveAdd = async (reason) => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const arrayHardware = listHardware.map(({ id, ...rest }) => rest);
      const arrayDetail = listDetail.map(({ id, ...rest }) => rest);
      const arrayNotes = listNote.map(({ id, ...rest }) => rest);
      const data = {
        docNo,
        docDate: moment(docDate).format("YYYYMMDD"),
        surveyDate: moment(surveyDate).format("YYYYMMDD"),
        picSurvey,
        sprintId: surveyPack.id,
        internetAvailability,
        internetAvailabilityRemark,
        pln,
        plnRemark,
        operationHours,
        operationHoursRemark,
        existingSystem,
        clientNeeds,
        solution,
        civilProject,
        tags,
        remark,
        reason,
        detail: arrayDetail,
        hardware: arrayHardware,
        notes: arrayNotes,
      };
      const response = await fetch(`${config.api_ptms}/survey/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      if (response.ok) {
        console.log(responseJSON.meta.message);
        setReasonModalOpen(true);
        closePage();
        setNotif("success", responseJSON.meta.message);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", responseData.meta.message);
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

  const saveEdit = async (reason) => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        id: dataEdit.id,
        docNo: docNo,
        docDate: docDate,
        surveyDate: surveyDate,
        picSurvey: picSurvey,
        sprintId: surveyPack.id,
        internetAvailability: internetAvailability,
        internetAvailabilityRemark: internetAvailabilityRemark,
        pln: pln,
        plnRemark: plnRemark,
        operationHours: operationHours,
        operationHoursRemark: operationHoursRemark,
        existingSystem: existingSystem,
        clientNeeds: clientNeeds,
        solution: solution,
        civilProject: civilProject,
        tags: tags,
        remark: remark,
        reason: reason,
      };
      const response = await fetch(`${config.api_ptms}/survey/edit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      if (response.ok) {
        setReasonModalOpen(true);
        closePage();
        setNotif("success", responseJSON.meta.message);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", responseData.meta.message);
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

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/survey/detail/${dataEdit.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDocNo(data.result.survey.docNo);
        setDocDate(data.result.survey.docDate);
        setSurveyDate(data.result.survey.surveyDate);
        setPicSurvey(data.result.survey.picSurvey);
        setInternetAvailability(data.result.survey.internetAvailability);
        setInternetAvailabilityRemark(
          data.result.survey.internetAvailabilityRemark
        );
        setPln(data.result.survey.pln);
        setPlnRemark(data.result.survey.plnRemark);
        setOperationHours(data.result.survey.operationHours);
        setOperationHoursRemark(data.result.survey.operationHoursRemark);
        setExistingSystem(data.result.survey.existingSystem);
        setClientNeeds(data.result.survey.clientNeeds);
        setSolution(data.result.survey.solution);
        setCivilProject(data.result.survey.civilProject);
        setTags(data.result.survey.tags);
        setRemark(data.result.survey.remark);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("Error ", error.message);
    }
  };

  const getDetailList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/survey/detail/list/${dataEdit.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setListDetail(data.result);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getHardwareList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/survey/hardware/list/${dataEdit.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        seTListHardware(data.result);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNoteList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/survey/notes/list/${dataEdit.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setListNote(data.result);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/survey/notes/remove/${id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        getNoteList();
        setNotif("success", data.meta.message);
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

  const closePage = () => {
    navigate("/sprint/survey");
  };

  const handleClickDetail = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenuDetail(dataMenu);
  };

  const handleClickHardware = (event, dataMenu) => {
    setAnchorElHardware(event.currentTarget);
    setDataMenuHardware(dataMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElHardware(null);
    setDataMenuDetail({});
    setDataMenuHardware({});
  };

  const tableDetailHeaders = [
    {
      title: "Action",
      value: "actionDetail",
      hidden: false,
      align: "left",
      width: "50px",
    },
    {
      title: "Project Category",
      value: "projectCtgrName",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "Parameter Title",
      value: "parameterTitle",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "Parameter Value",
      value: "parameterValue",
      hidden: false,
      align: "left",
      width: "180px",
    },
    {
      title: "Flg Additional",
      value: "flgAdditional",
      hidden: false,
      align: "center",
      width: "150px",
    },
    {
      title: "Remark",
      value: "remark",
      hidden: false,
      align: "left",
      width: "200px",
    },
  ];

  const renderCellDetail = (item, header) => {
    if (header.value === "actionDetail") {
      return (
        <div className="space-x-1 ml-2">
          <div className={isEditing ? "visible" : "hidden"}>
            <Button
              type="icon"
              iconName={faBars}
              onClick={(event) => handleClickDetail(event, item)}
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
                    setEditDetail(true);
                    setDataEditDetail(dataMenuDetail);
                    console.log("dataMenuDetail: ", dataMenuDetail);
                    setOpenModalDetail(true);
                    handleClose();
                  }}>
                  <ListItemGlobal type={"edit"} dataMenu={dataMenuDetail} />
                </MenuItem>
                {/* MENU 2 */}
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDetail(true);
                    setDataDetailDelete(dataMenuDetail.id);
                    setOpenValidDel(true);
                    handleClose();
                  }}>
                  <ListItemGlobal type={"delete"} dataMenu={dataMenuDetail} />
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className={isEditing ? "hidden" : "visible"}>
            <Button
              type="icon"
              iconName={faTrash}
              onClick={(e) => {
                e.stopPropagation();
                setIsDetail(true);
                setOpenValidDel(true);
                setIdDetailLocal(item.id);
              }}
            />
          </div>
        </div>
      );
    } else if (header.value === "flgAdditional") {
      return (
        <BadgeGlobal
          color={item[header.value] === "Y" ? "emerald" : "yellow"}
          text={item[header.value] === "Y" ? "Yes" : "No"}
        />
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  const tableHardwareHeaders = [
    {
      title: "Action",
      value: "actionHardware",
      hidden: false,
      align: "left",
      width: "50px",
    },
    {
      title: "Hardware Name",
      value: "hardwareName",
      hidden: false,
      align: "left",
      width: "150px",
    },
    // {
    //   title: "Specification (GADA SPEK)",
    //   value: "createAt",
    //   hidden: false,
    //   align: "left",
    //   width: "150px",
    // },
    {
      title: "Quantity",
      value: "qty",
      hidden: false,
      align: "left",
      width: "50px",
    },
    {
      title: "Flg Additional",
      value: "flgAdditional",
      hidden: false,
      align: "center",
      width: "100px",
    },
    {
      title: "Remark",
      value: "remark",
      hidden: false,
      align: "left",
      width: "250px",
    },
  ];

  const renderCellHardware = (item, header) => {
    if (header.value === "actionHardware") {
      return (
        <div className="space-x-1 ml-2">
          <div className={isEditing ? "visible" : "hidden"}>
            <Button
              type="icon"
              iconName={faBars}
              onClick={(event) => handleClickHardware(event, item)}
            />
            <Menu
              id="basic-menu-hardware"
              anchorEl={anchorElHardware}
              open={openHardware}
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
                    setEditHardware(true);
                    setDataEditHardware(dataMenuHardware);
                    setOpenModalHardware(true);
                    handleClose();
                  }}>
                  <ListItemGlobal type={"edit"} dataMenu={dataMenuHardware} />
                </MenuItem>
                {/* MENU 2 */}
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDetail(false);
                    setDataHardwareDelete(dataMenuHardware.id);
                    setOpenValidDel(true);
                    handleClose();
                  }}>
                  <ListItemGlobal type={"delete"} dataMenu={dataMenuHardware} />
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className={isEditing ? "hidden" : "visible"}>
            <Button
              type="icon"
              iconName={faTrash}
              onClick={(e) => {
                e.stopPropagation();
                setIsDetail(false);
                setOpenValidDel(true);
                setIdLocal(item.id);
              }}
            />
          </div>
        </div>
      );
    } else if (header.value === "flgAdditional") {
      return (
        <BadgeGlobal
          color={item[header.value] === "Y" ? "emerald" : "yellow"}
          text={item[header.value] === "Y" ? "Yes" : "No"}
        />
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    if (isEditing) {
      getDetailList();
      getHardwareList();
      getNoteList();
      fetchData();
      console.log("isEditing: ", isEditing);
      console.log("DataEdit: ", dataEdit);
      console.log("SurveyPack: ", surveyPack);
    } else {
      console.log("isEditing: ", isEditing);
      console.log("DataEdit: ", dataEdit);
      console.log("SurveyPack: ", surveyPack);
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
                        <div className="text-2xl md:text-2xl text-slate-800 font-bold">
                          {isEditing ? "Edit Survey" : "Add Survey"}
                        </div>
                        <div className="text-sm">
                          Sprint {surveyPack.sprintCode}
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
                    {/* ROW 2 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <TextFieldGlobal
                          label="Doc No"
                          placeholder="Input Document Number"
                          value={docNo}
                          onChange={(e) => setDocNo(e.target.value)}
                          type="standard"
                          readOnly={isEditing ? true : false}
                        />
                      </div>
                      <div className="w-1/2 -mt-2.5">
                        <DatePickerNew
                          label="Doc Date"
                          placeholder="Select Document Date"
                          value={docDate}
                          onChange={(value) => setDocDate(value)}
                        />
                      </div>
                    </div>
                    {/* ROW 3 */}
                    <div className="flex justify-between px-8 mt-2">
                      <div className="w-1/2 mr-8">
                        <TextFieldGlobal
                          label="PIC Survey"
                          placeholder="Enter PIC Survey"
                          value={picSurvey}
                          onChange={(e) => setPicSurvey(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2 -mt-2.5">
                        <DatePickerNew
                          label="Survey Date"
                          placeholder="Select Survey Date"
                          value={surveyDate}
                          onChange={(value) => setSurveyDate(value)}
                        />
                      </div>
                    </div>
                    {/* ROW 4 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <SwitchGlobal
                          label="Internet Avaibility"
                          value={internetAvailability}
                          onChange={(newValue) =>
                            setInternetAvailability(newValue)
                          }
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Remark"
                          placeholder="Enter Remark for Internet Avaibility"
                          value={internetAvailabilityRemark}
                          onChange={(e) =>
                            setInternetAvailabilityRemark(e.target.value)
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 5 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <SwitchGlobal
                          label="PLN Avaibility"
                          value={pln}
                          onChange={(newValue) => setPln(newValue)}
                        />
                      </div>
                      <div className="w-1/2 mt-2">
                        <TextFieldGlobal
                          label="Remark"
                          placeholder="Enter Remark for PLN"
                          value={plnRemark}
                          onChange={(e) => setPlnRemark(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 6 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <TextFieldGlobal
                          label="Operation Hours"
                          placeholder="Enter Operation Hours"
                          value={operationHours}
                          onChange={(e) => setOperationHours(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2">
                        <TextFieldGlobal
                          label="Remark"
                          placeholder="Enter Remark for Operation Hours"
                          value={operationHoursRemark}
                          onChange={(e) =>
                            setOperationHoursRemark(e.target.value)
                          }
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 7 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <TextFieldGlobal
                          label="Existing System"
                          placeholder="Input Existing System"
                          value={existingSystem}
                          onChange={(e) => setExistingSystem(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2">
                        <TextFieldGlobal
                          label="Civil Project"
                          placeholder="Input Civil Project"
                          value={civilProject}
                          onChange={(e) => setCivilProject(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 8 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <TextFieldGlobal
                          label="Client Needs"
                          multiline={true}
                          rows={3}
                          placeholder="Enter the Client Needs here..."
                          value={clientNeeds}
                          onChange={(e) => setClientNeeds(e.target.value)}
                          type="standard"
                        />
                      </div>
                      <div className="w-1/2">
                        <TextFieldGlobal
                          label="Solution"
                          multiline={true}
                          rows={3}
                          placeholder="Enter Solution here..."
                          value={solution}
                          onChange={(e) => setSolution(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 9 */}
                    <div className="w-full px-8 mt-1">
                      <div>
                        <TextFieldGlobal
                          label="Tags"
                          placeholder="Type Tags here"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* ROW 10 */}
                    <div className="w-full px-8 mt-1">
                      <div>
                        <TextFieldGlobal
                          label="Remark"
                          multiline={true}
                          rows={3}
                          placeholder="Enter Remark"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          type="standard"
                        />
                      </div>
                    </div>
                    {/* "Note" BUTTON */}
                    <div className="flex justify-start px-8 mt-5">
                      <div>
                        <Button
                          type="primary"
                          iconName={faPlus}
                          text="Add Note"
                          onClick={(e) => {
                            setEditNote(false);
                            setNoteModalOpen(true);
                            e.stopPropagation();
                          }}
                        />
                      </div>
                    </div>
                    {/* NOTE */}
                    <div className="w-full px-4 mt-1">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 650, border: "none" }}
                          aria-label="simple table">
                          <TableBody>
                            {listNote.map((note) => (
                              <TableRow key={note.id}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={{ border: "none" }}>
                                  <div className="flex justify-end text-sm font-bold mr-1">
                                    <div
                                      className={
                                        isEditing ? "-mb-1 mr-3" : "-mb-1"
                                      }
                                      style={{ color: "#fc0303" }}>
                                      <Tooltip
                                        title="Delete"
                                        placement="left-start">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isEditing) {
                                              deleteData(note.id);
                                            } else {
                                              deleteDataNoteLocal(note.id);
                                            }
                                            return;
                                            setIsNote(true);
                                            setDataNoteDelete(note.id);
                                            setOpenValidDel(true);
                                          }}>
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      </Tooltip>
                                    </div>

                                    <div
                                      className={isEditing ? "-mb-1" : "hidden"}
                                      style={{ color: "#cfcb00" }}
                                      data-tip="Edit">
                                      <Tooltip
                                        title="Edit"
                                        placement="right-start">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditNote(true);
                                            setNoteEdit(note);
                                            setNoteModalOpen(true);
                                          }}>
                                          <FontAwesomeIcon
                                            icon={faPenToSquare}
                                          />
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                  <div className="-mt-5">
                                    <WysiwygReadOnlyGlobal
                                      readOnly={true}
                                      label={note.notesTittle}
                                      item={note.notes}
                                      maxHeight="500px"
                                      labelSize="13px"
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    {/* DETAIL */}
                    <div>
                      {/* BUTTON */}
                      <div className="flex justify-start px-8 mt-5">
                        <div>
                          <Button
                            type="primary"
                            iconName={faPlus}
                            text="Add Row"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditDetail(false);
                              setOpenModalDetail(true);
                            }}
                          />
                        </div>
                      </div>
                      {/* TABLE */}
                      <div className="w-full px-8 mt-5">
                        <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
                          <div>
                            <div className="overflow-x-auto overflow-y-auto">
                              <CustomTable
                                headers={tableDetailHeaders}
                                items={tableDataDetail}
                                renderCell={renderCellDetail}
                                checkBox={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* HARDWARE */}
                    <div>
                      {/* BUTTON */}
                      <div className="flex justify-start px-8 mt-5">
                        <div>
                          <Button
                            type="primary"
                            iconName={faPlus}
                            text="Add Hardware"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditHardware(false);
                              setOpenModalHardware(true);
                            }}
                          />
                        </div>
                      </div>
                      {/* TABLE */}
                      <div className="w-full px-8 mt-5 mb-4">
                        <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
                          <div>
                            <div className="overflow-x-auto overflow-y-auto">
                              <CustomTable
                                headers={tableHardwareHeaders}
                                items={tableDataHardware}
                                renderCell={renderCellHardware}
                                checkBox={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* BUTTON BOTTOM */}
                    <div className="flex mb-2 ml-12 mt-16 justify-end">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <SurveyNote
        modalOpen={noteModalOpen}
        setModalOpen={setNoteModalOpen}
        dataResultSurvey={dataEdit}
        getDataList={getNoteList}
        noteEdit={noteEdit}
        isEditing={editNote}
        isEditingSurveyForm={isEditing}
        dataNote={noteLocal}
      />
      <ModalReason
        modalOpen={reasonModalOpen}
        setModalOpen={setReasonModalOpen}
        saveAdd={saveAdd}
        isEditing={isEditing}
        saveEdit={saveEdit}
      />
      <SurveyDetailModal
        modalOpen={openModalDetail}
        setModalOpen={setOpenModalDetail}
        isEditing={editDetail}
        isEditingSurveyForm={isEditing}
        sprintToDetailPack={surveyPack}
        dataResult={dataEditDetail}
        dataResultSurvey={dataEdit}
        getDataList={getDetailList}
        dataDetail={DetailLocal}
      />
      <SurveyHardwareModal
        modalOpen={openModalHardware}
        setModalOpen={setOpenModalHardware}
        isEditing={editHardware}
        isEditingSurveyForm={isEditing}
        sprintToHardwarePack={surveyPack}
        dataResult={dataEditHardware}
        getDataList={getHardwareList}
        dataResultSurvey={dataEdit}
        dataHardware={hardwareLocal}
      />
      <SurveyValidation
        modalOpen={openValidDel}
        setModalOpen={setOpenValidDel}
        getDataList={isDetail ? getDetailList : getHardwareList}
        idLocal={isDetail ? idDetailLocal : idLocal}
        apiUrl={
          isDetail
            ? `${config.api_ptms}/survey/detail/remove/${dataDetailDelete}`
            : `${config.api_ptms}/survey/hardware/remove/${dataHardwareDelete}`
        }
        // listData={listHardware}
        setListData={seTListHardware}
        isEditing={isEditing}
        deleteDataLocal={
          isDetail ? deleteDataDetailLocal : deleteDataHardwareLocal
        }
      />
    </div>
  );
}
