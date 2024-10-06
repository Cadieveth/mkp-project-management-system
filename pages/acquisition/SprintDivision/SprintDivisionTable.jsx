import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import {
  faPlus,
  faXmark,
  faBars,
  faSquare,
  faTrash,
  faHand,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../../../components/Button";
import config from "../../../../config";
import CustomTable from "../../../components/CustomTable";
import { Menu, MenuList, MenuItem, Tooltip } from "@mui/material";
import ListItemGlobal from "../../../components/ListItemGlobal";
import SprintDivisionDropdown from "./SprintDivisionDropdown";
import SprintValid from "../Sprint/SprintValid";
import MultiProgress, { ProgressComponentProps } from "react-multi-progress";
import { Box, styled, Typography } from "@mui/material";
import { handleTokenExpired } from "../../../utils/Utils";

export default function SprintDivisionTable() {
  const {
    divisionPack,
    setNewDataSprint,
    setLoadingState,
    setNotif,
    statusOpenViaDivision,
    setNewDivisionId,
    setNewTaskSprint,
  } = useStateContext();
  const [list, setList] = useState([]);
  const [dataMenu, setDataMenu] = useState({});
  const [selectedDivisionId, setSelectedDivisionId] = useState(null);
  const [setSelectedDivisionToAdd] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [refreshDropdown, setRefreshDropdown] = useState("");
  const [openValidationDelete, setOpenValidationDelete] = useState(false);
  const [id, setId] = useState(-99);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const tableData = list;

  const getDivisionList = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/division/list/${divisionPack.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (divisionPack.id === undefined || divisionPack.id === null) {
          navigate("/sprint");
        }
        setList(data.result);
        setNotif("success", data.meta.message);
        setRefreshDropdown("");
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

  const addDivision = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        sprintId: divisionPack.id,
        divisionId: selectedDivisionId,
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
        setNotif("success", responseData.meta.message);
        getDivisionList();
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const deleteDivision = async () => {
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
        getDivisionList();
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const handleDropdownChange = (selectedValue) => {
    setSelectedDivisionId(selectedValue);
  };

  const handleClickAction = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleClickDragNDrop = (data) => {
    setNewDivisionId(data);
    statusOpenViaDivision(true);
    setNewTaskSprint(divisionPack);
    navigate("/training");
  };

  const handleAddLink = () => {
    statusOpenViaDivision(true);
    navigate("/sprint/link-sprint");
  };

  const handleClickTask = () => {
    statusOpenViaDivision(true);
    setNewTaskSprint(divisionPack);
    navigate("/sprint/taskDivision");
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
    setDataMenu({});
  };

  const handleDeleteData = (data) => {
    // console.log("Data yang diklik: ", data);
    setId(data.id);
    setOpenValidationDelete(true);
  };

  const handleDivisionNameClick = (data) => {
    if (data.divisionName === "-") {
      setNotif("warning", "No Data Available");
      return;
    }
    setNewDivisionId(data);
    statusOpenViaDivision(true);
    setNewTaskSprint(divisionPack);
    navigate("/sprint/taskDivision");
  };

  const handleCheck = () => {
    console.log("divisionPack: ", divisionPack);
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

  useEffect(() => {
    // Pengecekan apakah list tidak null
    if (list === null) {
      setNotif("warning", `Unavailable Division Data on this Sprint`);
      return; // Keluar dari useEffect jika list null
    }

    // Fungsi untuk menghitung persentase progres dan memperbarui state
    const calculateProgress = () => {
      const updatedProgressData = list.map((item) => ({
        id: item.id,
        progress: {
          done: calculatePct(item.todo, item.inProgress, item.done, "done"),
          inProgress: calculatePct(
            item.todo,
            item.inProgress,
            item.done,
            "inProgress"
          ),
        },
      }));

      setProgressData(updatedProgressData);
    };

    // Memanggil fungsi pertama kali komponen dirender
    calculateProgress();
  }, [list]);

  const tableHeaders = [
    {
      title: "Action",
      value: "action",
      hidden: false,
      align: "left",
      width: "50px",
    },
    {
      title: "Division Code",
      value: "divisionCode",
      hidden: false,
      align: "left",
      width: "200px",
      style: { fontWeight: "bold" },
    },
    {
      title: "Division Name",
      value: "divisionName",
      hidden: false,
      align: "left",
      width: "200px",
      style: { fontWeight: "bold" },
    },
    {
      title: "Progress",
      value: "progress",
      hidden: false,
      align: "left",
      width: "500px",
    },
  ];

  const renderCell = (item, header) => {
    const formatedDate = ["meetingDate"];
    if (header.value === "action") {
      return (
        <div className="space-x-1 ml-2">
          <Button
            type="icon"
            iconName={faBars}
            onClick={(event) => handleClickAction(event, item)}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseAction}
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
                  setId(dataMenu.id);
                  setOpenValidationDelete(true);
                  handleCloseAction();
                }}>
                <ListItemGlobal type={"delete"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 2 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setNewDivisionId(dataMenu);
                  statusOpenViaDivision(true);
                  setNewTaskSprint(divisionPack);
                  navigate("/training");
                }}>
                <ListItemGlobal type={"dragNDrop"} dataMenu={dataMenu} />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      );
      // if (header.value === "action") {
      //   return (
      //     <div className="flex">
      //       <div>
      //         <Tooltip title="Delete" placement="right">
      //           <span className="ml-4">
      //             <FontAwesomeIcon
      //               icon={faTrash}
      //               style={{ color: "#eb3434", cursor: "pointer" }}
      //               onClick={(e) => {
      //                 e.stopPropagation();
      //                 handleDeleteData(item);
      //               }}
      //             />
      //           </span>
      //         </Tooltip>
      //       </div>
      //       <div>
      //         <Tooltip title="Drag & Drop" placement="right">
      //           <span className="ml-4">
      //             <FontAwesomeIcon
      //               icon={faHand}
      //               style={{ color: "#ab6d16", cursor: "pointer" }}
      //               onClick={(e) => {
      //                 e.stopPropagation();
      //                 handleClickDragNDrop(item);
      //               }}
      //             />
      //           </span>
      //         </Tooltip>
      //       </div>
      //     </div>
      //   );
    } else if (header.value === "progress") {
      const itemProgress = progressData.find((p) => p.id === item.id);

      return (
        <div className="text-xs font-bold">
          <MultiProgress
            elements={[
              {
                value: itemProgress?.progress?.done || 0,
                color: "#00b300",
                showPercentage: true,
                textColor: "white",
                fontSize: 10,
                isBold: false,
                className: "my-custom-css-class",
              },
              {
                value: itemProgress?.progress?.inProgress || 0,
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
            <Typography variant="body2" color="text.secondary">
              <div className="flex justify-between">
                <div className="text-[9px] font-bold">
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{
                      color: "#e4e4e4",
                    }}
                  />
                  <span className="ml-1">ToDo</span>
                </div>
                <div className="text-[9px] font-bold">
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{
                      color: "#d5d900",
                    }}
                  />
                  <span className="ml-1">In Progress</span>
                </div>
                <div className="text-[9px] font-bold">
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{
                      color: "#00b300",
                    }}
                  />
                  <span className="ml-1">Done</span>
                </div>
              </div>
            </Typography>
          </Box>
        </div>
      );
    } else if (header.value === "divisionCode") {
      return (
        <span
          onClick={() => handleDivisionNameClick(item)}
          style={{ cursor: "pointer" }}>
          <div className="text-blue-500 underline" style={header.style}>
            <Tooltip title="Open Task" placement="right">
              {item[header.value] ? item[header.value] : "-"}
            </Tooltip>
          </div>
        </span>
      );
    } else if (header.value === "divisionName") {
      return <span style={header.style}>{item[header.value]}</span>;
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    getDivisionList();
  }, []);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl md:text-2xl text-slate-800 font-bold">
            Division
          </div>
          <div className="text-sm"> Sprint {divisionPack.sprintCode}</div>
        </div>
        <div className="flex justify-center">
          <Button
            type="bigIcon"
            iconName={faXmark}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/sprint");
            }}
            iconSize="text-xl"
            titleTooltip="Back"
          />
        </div>
      </div>
      <div className="flex justify-between py-5">
        <div className="w-1/2 mr-4">
          <SprintDivisionDropdown
            onChange={handleDropdownChange}
            setSelectedDivisionToAdd={setSelectedDivisionId}
            reset={refreshDropdown} // Tambahkan prop reset untuk mengontrol reset dropdown
          />
        </div>
        <div className="flex flex-wrap w-1/2 ml-4">
          <div className="flex items-end w-auto mr-4">
            <Button
              type="primary"
              iconName={faPlus}
              text="Add Division"
              onClick={(e) => {
                e.stopPropagation();
                addDivision();
              }}
            />
          </div>
          <div className="flex justify-start items-end w-auto ml-4 hidden">
            <Button
              type="primary"
              iconName={faPlus}
              text="Link"
              onClick={(e) => {
                e.stopPropagation();
                setNewDataSprint(divisionPack);
                handleAddLink();
              }}
            />
          </div>
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
      <SprintValid
        modalOpen={openValidationDelete}
        setModalOpen={setOpenValidationDelete}
        deleteDataDivision={deleteDivision}
      />
    </div>
  );
}
