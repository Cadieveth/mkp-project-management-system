import React, { useState, useEffect } from "react";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { Box, Tab, Checkbox, TextField, Autocomplete } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ModalBasic from "../../../components/ModalBasic";
import ModalCustom from "../../../components/ModalCustom";
import config from "../../../../config";
import Button from "../../../components/Button";
import CustomTableCB from "../../../components/CustomTableCB";
import { useStateContext } from "../../../ContextProvider";
import { arrOfObjUniqueIdentifier } from "../../../utils/Utils";
import styled from "@mui/material/styles/styled";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import moment from "moment/moment";
import DatePickerNew from "../../../components/DatePickerNew";
import SwitchGlobal from "../../../components/SwitchGlobal";
import LinkDropdown from "../Link/LinkDropdown";

export default function TaskDivisionModalAdd({
  modalOpen,
  setModalOpen,
  sprintId,
  divisionId,
  getTaskDivisionList,
  openFromDefault,
}) {
  const { setNotif, setLoadingState } = useStateContext();
  const [value, setValue] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [linkList, setLinkList] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const tableDataTask = taskList;

  const [startDate, setStartDate] = useState(moment().format("DD MMM YYYY"));
  const [endDate, setEndDate] = useState(
    moment().add(1, "weeks").format("DD MMM YYYY")
  );
  const [additionalLink, setAdditionalLink] = useState("N");
  const baseLinkId = {
    linkId: { label: "", value: -99 },
  };
  const [linkForm, setLinkForm] = useState(baseLinkId);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  useEffect(() => {
    if (openFromDefault) {
      setValue("1");
    } else {
      setValue("2");
    }
  }, [modalOpen, openFromDefault]);

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

  const getTaskList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/task/list?divisionId=${divisionId}&keyword&status=Y&limit=25&offset=0`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTaskList(data.result);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const saveTaskDefault = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      // const data = {
      //   sprintId: sprintId,
      //   divisionId: divisionId,
      //   task: selectedTask.map((idTask) => ({ id: idTask })),
      // };
      const data = {
        sprintId: sprintId,
        divisionId: divisionId,
        // startDate: moment().format("YYYYMMDD"),
        // endDate: moment().add(1, "weeks").format("YYYYMMDD"),
        task: selectedTask.map((taskName) => ({ taskName })),
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
        closeModal();
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

  const saveTaskUnique = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        sprintId: sprintId,
        divisionId: divisionId,
        startDate: moment(startDate).format("YYYYMMDD"),
        endDate: moment(endDate).format("YYYYMMDD"),
        taskName,
        taskDesc,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/task-division/add-unique`,
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
        closeModal();
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

  // const handleSelect = (idTask) => {
  //   setSelectedTask((prevSelectedTask) => {
  //     if (prevSelectedTask.includes(idTask)) {
  //       return prevSelectedTask.filter((id) => id !== idTask);
  //     } else {
  //       return [...prevSelectedTask, idTask];
  //     }
  //   });
  // };

  const handleSelect = (taskName) => {
    setSelectedTask((prevSelectedTask) => {
      if (prevSelectedTask.includes(taskName)) {
        return prevSelectedTask.filter((name) => name !== taskName);
      } else {
        return [...prevSelectedTask, taskName];
      }
    });
  };

  const TaskHeaders = [
    {
      title: "",
      value: "checkBox",
      hidden: false,
      align: "center",
      width: "50px",
    },
    {
      title: "Task Code",
      value: "taskCode",
      hidden: false,
      align: "left",
      width: "150px",
      marginLeft: 10,
    },
    {
      title: "Task Name",
      value: "taskName",
      hidden: false,
      align: "left",
      width: "200px",
      marginLeft: 10,
    },
    {
      title: "Description",
      value: "description",
      hidden: false,
      align: "left",
      width: "450px",
      marginLeft: 10,
    },
  ];

  const renderTaskCell = (item, header) => {
    const marginLeftStyle = header.marginLeft
      ? { marginLeft: `${header.marginLeft}px` }
      : {};

    if (header.value === "task") {
      return (
        <span style={marginLeftStyle}>
          {item.taskCode} - {item.taskName}
        </span>
      );
    } else if (header.value === "checkBox") {
      return (
        // <Checkbox
        //   checked={selectedTask.includes(item.id)}
        //   onChange={() => handleSelect(item.id)}
        //   inputProps={{ "aria-label": "controlled" }}
        //   size="xs"
        //   checkedIcon={<BpCheckedIcon />}
        //   icon={<BpIcon />}
        //   style={marginLeftStyle} // Tambahkan marginLeftStyle di sini
        // />
        <Checkbox
          checked={selectedTask.includes(item.taskName)}
          onChange={() => handleSelect(item.taskName)}
          inputProps={{ "aria-label": "controlled" }}
          size="xs"
          checkedIcon={<BpCheckedIcon />}
          icon={<BpIcon />}
          style={marginLeftStyle}
        />
      );
    } else {
      return (
        <span style={marginLeftStyle}>
          {item[header.value] ? item[header.value] : "-"}
        </span>
      );
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddLinkChange = (newValue) => {
    setAdditionalLink(newValue);
  };

  const closeModal = () => {
    setValue("");
    setModalOpen(false);
    setTaskName("");
    setStartDate(moment().format("DD MMM YYYY"));
    setEndDate(moment().add(1, "weeks").format("DD MMM YYYY"));
    setAdditionalLink("N");
    setLinkForm(-99);
  };

  const onClickSaveButton = (e) => {
    e.stopPropagation();
    if (value === "1") {
      console.log("Click Save 1 Button");
      saveTaskDefault();
    } else if (value === "2") {
      console.log("Click Save 2 Button");
      saveTaskUnique();
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <ModalCustom
      id="addTaskDivision-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Task Division Data Add"
      type="5xl">
      <div className="py-3 px-5">
        <div>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example">
                  <Tab
                    label={
                      <span
                        style={{
                          fontWeight: value === "1" ? "bold" : "normal",
                          fontSize: value === "1" ? "13px" : "12px",
                        }}>
                        Task by Default
                      </span>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <span
                        style={{
                          fontWeight: value === "2" ? "bold" : "normal",
                          fontSize: value === "2" ? "13px" : "12px",
                        }}>
                        Unique Task
                      </span>
                    }
                    value="2"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="overflow-x-auto overflow-y-auto">
                  <CustomTableCB
                    headers={TaskHeaders}
                    items={tableDataTask}
                    renderCell={renderTaskCell}
                    checkBox={false}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div>
                  {/* ROW 1 */}
                  <div className="mb-2">
                    <TextFieldGlobal
                      label="Task Name"
                      placeholder={"Enter any Name of the Task"}
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      type="standard"
                    />
                  </div>
                  {/* ROW 2 */}
                  <div className="flex justify-between mb-2">
                    <div className="w-1/2 mr-4">
                      <DatePickerNew
                        label="Start Date"
                        value={startDate}
                        onChange={(value) => setStartDate(value)}
                      />
                    </div>
                    <div className="w-1/2 ml-4">
                      <DatePickerNew
                        label="Start Date"
                        value={endDate}
                        onChange={(value) => setEndDate(value)}
                      />
                    </div>
                  </div>
                  {/* ROW 3 */}
                  <div className="mb-2">
                    <div className="w-full">
                      <TextFieldGlobal
                        label="Task Desc"
                        placeholder="Input Description of the Task"
                        multiline={true}
                        rows={2}
                        type="standard"
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        <div className="flex justify-end mb-2">
          <Button
            type="primary"
            iconName={faFloppyDisk}
            text="Save"
            onClick={onClickSaveButton}
          />
        </div>
      </div>
    </ModalCustom>
  );
}
