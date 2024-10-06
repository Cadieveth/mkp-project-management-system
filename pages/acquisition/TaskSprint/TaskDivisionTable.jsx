import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import {
  faXmark,
  faBars,
  faFloppyDisk,
  faFolderPlus,
  faRotate,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuList, MenuItem, Checkbox, Tooltip } from "@mui/material";
import Button from "../../../components/Button";
import config from "../../../../config";
import CustomTable from "../../../components/CustomTable";
import ListItemGlobal from "../../../components/ListItemGlobal";
import BadgeGlobal from "../../../components/BadgeGlobal";
import moment from "moment";
import CustomTableCB from "../../../components/CustomTableCB";
import TaskDivisionModal from "./TaskDivisionModal";
import LinkValid from "../Link/LinkValid";
import styled from "@mui/material/styles/styled";
import TaskDivisionModalStatus from "./TaskDivisionModalStatus";
import TaskDivisionNewStatusDropdown from "./TaskDivisionNewStatusDropdown";
import TaskDivisionStatus from "./TaskDivisionStatus";
import TaskDivisionModalAdd from "./TaskDivisionModalAdd";
import TaskDivisionModalLink from "./TaskDivisionModalLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskDivisionTable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const {
    setLoadingState,
    setNotif,
    dataSprint,
    divisionId,
    openViaDivision,
    taskSprint,
  } = useStateContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [list, setList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [dataMenu, setDataMenu] = useState({});
  const [taskDataMenu, setTaskDataMenu] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [dataResult, setDataResult] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const tableData = list;
  const tableDataTask = taskList;
  const [checked, setChecked] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [status, setStatus] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openFromDefault, setOpenFromDefault] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const openLinkModal = (item) => {
    setSelectedItem(item);
    setLinkModalOpen(true);
  };

  const getTaskDivisionList = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/task-division/list?sprintId=${taskSprint.id}&divisionId=${divisionId.divisionId}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (taskSprint.id === undefined || taskSprint.id === null) {
          navigate("/sprint");
        }

        const updatedList = (data.result ?? []).map((item) => ({
          ...item,
          status: item.status,
        }));
        setList(updatedList);
        setStatus(updatedList);
        setNotif("success", data.meta.message || "Success Get DataList");
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

  const saveTaskDiv = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        sprintId: dataSprint.id,
        divisionId: divisionId.divisionId,
        task: selectedTask.map((idTask) => ({ id: idTask })),
      };

      const response = await fetch(
        `${config.api_ptms}/sprint/task-division/add`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        }
      );
      const responseJSON = await response.json();
      if (response.ok) {
        console.log(responseJSON.meta.message);
        getTaskDivisionList();
        setSelectedTask([]);
        setNotif("success", responseJSON.meta.message);
      } else {
        setNotif("warning", responseJSON.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const handleClick = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
    setTaskDataMenu(taskDataMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDataMenu({});
    setTaskDataMenu({});
  };

  const handleTaskNameClick = (data) => {
    setDataResult(data);
    setEditModalOpen(true);
  };

  const handleCheck = () => {
    console.log("divisionId: ", divisionId);
    console.log("dataSprint: ", dataSprint);
    console.log("taskSprint: ", taskSprint);
    console.log("data dari API: ", list);
    console.log("status: ", status);
  };

  const handleSelect = (idTask) => {
    setSelectedTask((prevSelectedTask) => {
      if (prevSelectedTask.includes(idTask)) {
        return prevSelectedTask.filter((id) => id !== idTask);
      } else {
        return [...prevSelectedTask, idTask];
      }
    });
  };

  const handleDeleteData = (data) => {
    setDataDelete(data.id);
    setValidDelModalOpen(true);
  };

  const closePage = () => {
    openViaDivision ? navigate("/sprint/Division") : navigate("/sprint-add");
  };

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 11,
    height: 11,
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#e6e3e3",
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#1c5fc7" : "#1c5fc7",
    },
    "input:disabled ~ &": {
      background: theme.palette.mode === "dark" ? "#474745" : "#474745",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#1c44ac",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 11,
      height: 11,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#1c5fc7",
    },
  });

  const mapStatusToDisplay = (status) => {
    switch (status) {
      case "INPROGRESSINTERNAL":
        return "IN PROGRESS INTERNAL";
      case "INPROGRESSEXTERNAL":
        return "IN PROGRESS EXTERNAL";
      case "TODO":
        return "TO DO";
      case "DONE":
        return "DONE";
      default:
        return status;
    }
  };

  const tableHeaders = [
    {
      title: "Action",
      value: "action",
      hidden: false,
      align: "left",
      width: "10px",
    },
    {
      title: "Task",
      value: "taskName",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Start Date",
      value: "startDate",
      hidden: false,
      align: "left",
      width: "120px",
    },
    {
      title: "End Date",
      value: "endDate",
      hidden: false,
      align: "left",
      width: "120px",
    },
    {
      title: "Actual End Date",
      value: "actualFinalDate",
      hidden: false,
      align: "left",
      width: "160px",
    },
    {
      title: "Status",
      value: "status",
      hidden: false,
      align: "left",
      width: "250px",
    },
    {
      title: "Link",
      value: "link",
      hidden: false,
      align: "left",
      width: "140px",
    },
    {
      title: "Description",
      value: "taskDesc",
      hidden: false,
      align: "left",
      width: "350px",
    },
  ];

  const renderCell = (item, header) => {
    const formatedDate = ["startDate", "endDate", "actualFinalDate"];
    // if (header.value === "action") {
    //   return (
    //     <div className="space-x-1">
    //       <Button
    //         type="icon"
    //         iconName={faBars}
    //         onClick={(event) => handleClick(event, item)}
    //       />
    //       <Menu
    //         id="basic-menu"
    //         anchorEl={anchorEl}
    //         open={open}
    //         onClose={handleClose}
    //         MenuListProps={{
    //           "aria-labelledby": "basic-button",
    //         }}
    //         PaperProps={{
    //           style: {
    //             border: "1px solid #e4ecf4",
    //           },
    //         }}>
    //         <MenuList sx={{ width: 150 }}>
    //           {/* MENU 1 */}
    //           <MenuItem
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               setDataResult(dataMenu);
    //               setEditModalOpen(true);
    //               handleClose();
    //             }}>
    //             <ListItemGlobal type={"edit"} dataMenu={dataMenu} />
    //           </MenuItem>
    //           {/* MENU 2 */}
    //           <MenuItem
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               setValidDelModalOpen(true);
    //               setDataDelete(dataMenu.id);
    //               handleClose();
    //             }}>
    //             <ListItemGlobal type={"delete"} dataMenu={dataMenu} />
    //           </MenuItem>
    //         </MenuList>
    //       </Menu>
    //     </div>
    //   );

    // NEW
    // } else if (header.value === "title") {
    //   const linkUrl = item.link;

    //   const openLinkInNewTab = () => {
    //     window.open(linkUrl.startsWith("http") ? linkUrl : `http://${linkUrl}`);
    //   };

    //   const linkStyle = {
    //     color: "#0004ff",
    //     textDecoration: linkUrl ? "underline" : "none",
    //     cursor: "pointer",
    //   };

    //   return (
    //     <span style={linkStyle} onClick={openLinkInNewTab}>
    //       {item[header.value] ? item[header.value] : "-"}
    //     </span>
    //   );
    if (header.value === "action") {
      return (
        <Tooltip title="Delete Task" placement="right">
          <span className="ml-4">
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: "#eb3434", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteData(item);
              }}
            />
          </span>
        </Tooltip>
      );
    } else if (header.value === "taskDesc") {
      return (
        <span>
          {item[header.value] ? item[header.value] : "No Description Task"}
        </span>
      );
    } else if (header.value === "status") {
      return (
        <TaskDivisionNewStatusDropdown
          value={mapStatusToDisplay(item.status)}
          itemId={item.id}
          getTaskDivisionList={getTaskDivisionList}
          hidden={true}
        />
      );
    } else if (formatedDate.includes(header.value)) {
      const formattedDate = moment(item[header.value]).format("DD MMM YYYY");
      return (
        <span> {formattedDate == "Invalid date" ? "-" : formattedDate} </span>
      );
    } else if (header.value === "link") {
      return (
        <Tooltip title="Open Link Modal" placement="top">
          <div
            className="text-blue-600 underline"
            style={{ cursor: "pointer" }}
            onClick={() => openLinkModal(item)}>
            {`Attachment(${item.totalLink})`}
          </div>
        </Tooltip>
      );
    } else if (header.value === "taskName") {
      return (
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleTaskNameClick(item);
          }}
          style={{ cursor: "pointer" }}>
          <div className="text-blue-500 underline">
            <Tooltip title="Edit Task" placement="right">
              {item[header.value] ? item[header.value] : "-"}
            </Tooltip>
          </div>
        </span>
      );
    } else if (header.value === "actualFinalDate") {
      return item[header.value] === "" ? (
        <span>-</span>
      ) : (
        <span>{item[header.value]}</span>
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    getTaskDivisionList();
    console.log("divisionId: ", divisionId.divisionId);
    console.log("SprintId: ", dataSprint.id);
    console.log("StatusOpenViaDivision: ", openViaDivision);
  }, []);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl md:text-2xl text-slate-800 font-bold">
            Task Division {divisionId.divisionName}
          </div>
          <div className="text-sm"> Sprint {taskSprint.sprintCode}</div>
        </div>
        <div className="flex justify-center">
          <Button
            type="bigIcon"
            iconName={faXmark}
            onClick={(e) => {
              e.stopPropagation();
              closePage();
            }}
            iconSize="text-xl"
            titleTooltip="Back"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="mt-5 mr-2 hidden">
          <Button type="primary" text="Check" onClick={handleCheck} />
        </div>
        <div className="mt-5">
          <Button
            type="primary"
            iconName={faPlus}
            text="Add Task by Default"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModalAdd(true);
              setOpenFromDefault(true);
            }}
          />
        </div>
        <div className="mt-5 ml-2">
          <Button
            type="primary"
            iconName={faPlus}
            text="Add Unique Task"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModalAdd(true);
              setOpenFromDefault(false);
            }}
          />
        </div>
        <div className="mt-5 ml-2 hidden">
          <Button
            type="primary"
            iconName={faFloppyDisk}
            text="Save"
            onClick={saveTaskDiv}
          />
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative mt-5">
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
      <TaskDivisionModalAdd
        modalOpen={openModalAdd}
        setModalOpen={setOpenModalAdd}
        sprintId={taskSprint.id}
        divisionId={divisionId.divisionId}
        getTaskDivisionList={getTaskDivisionList}
        openFromDefault={openFromDefault}
      />
      <TaskDivisionModal
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        dataResult={dataResult}
        divisionData={divisionId}
        sprintData={taskSprint}
        getDataList={getTaskDivisionList}
      />
      <LinkValid
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        getDataList={getTaskDivisionList}
        apiUrl={`${config.api_ptms}/sprint/task-division/remove/${dataDelete}`}
      />
      <TaskDivisionModalLink
        modalOpen={linkModalOpen}
        setModalOpen={setLinkModalOpen}
        divisionData={divisionId}
        sprintData={taskSprint}
        taskData={selectedItem}
        getList={getTaskDivisionList}
      />
    </div>
  );
}

export default TaskDivisionTable;
