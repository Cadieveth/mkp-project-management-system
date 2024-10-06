import React, { useState, useEffect } from "react";
import {
  faArrowLeft,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import ModalCustom from "../../../components/ModalCustom";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import config from "../../../../config";
import { useStateContext } from "../../../ContextProvider";
import DatePickerNew from "../../../components/DatePickerNew";
import SwitchGlobal from "../../../components/SwitchGlobal";
import TaskDivisionStatus from "./TaskDivisionStatus";
import TaskDivisionDropdown from "./TaskDivisionDropdown";
import moment from "moment";
import TaskDivisionNewStatusDropdown from "./TaskDivisionNewStatusDropdown";

export default function TaskDivisionModal({
  modalOpen,
  setModalOpen,
  dataResult,
  divisionData,
  sprintData,
  getDataList,
}) {
  const [id, setId] = useState(-99);
  const [sprintId, setSprintId] = useState(-99);
  const [divisionId, setDivisionId] = useState(-99);
  const [taskId, setTaskId] = useState(-99);
  const [startDate, setStartDate] = useState(moment().format("DD MMM YYYY"));
  const [endDate, setEndDate] = useState(
    moment().add(1, "weeks").format("DD MMM YYYY")
  );
  const [status, setStatus] = useState("");
  const [additionalLink, setAdditionalLink] = useState("");
  const [linkId, setLinkId] = useState(-99);
  const { setLoadingState, setNotif } = useStateContext();
  const baseFormSprint = {
    linkId: { label: "", value: -99 },
  };
  const [form, setForm] = useState(baseFormSprint);
  const baseLinkDivision = {
    linkId: { label: "", value: -99 },
  };
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [actualFinalDate, setActualFinalDate] = useState(
    moment().format("DD MMM YYYY")
  );

  useEffect(() => {
    console.log("test: ", dataResult);
    if (dataResult) {
      // setStartDate(
      //   dataResult.startDate === ""
      //     ? moment().format("DD MMM YYYY")
      //     : moment(dataResult.startDate).format("DD MMM YYYY")
      // );
      // setEndDate(
      //   dataResult.endDate === ""
      //     ? moment().format("DD MMM YYYY")
      //     : moment(dataResult.endDate).format("DD MMM YYYY")
      // );
      setAdditionalLink(dataResult.additionalLink);
      setStatus(dataResult.status);
      // setLinkId(dataResult.linkId || -99);
      setForm({
        linkId: {
          label: dataResult.linkCode + "  -  " + dataResult.title,
          value: dataResult.linkId,
        },
      });
      setTaskName(dataResult.taskName);
      setTaskDesc(dataResult.taskDesc);
      const formattedActualFinalDate =
        dataResult.actualFinalDate === "" || dataResult.actualFinalDate === "-"
          ? moment().format("DD MMM YYYY")
          : moment(dataResult.actualFinalDate).format("DD MMM YYYY");
      setActualFinalDate(formattedActualFinalDate);
      const formattedStartDate =
        dataResult.startDate === "" || dataResult.startDate === "-"
          ? moment().format("DD MMM YYYY")
          : moment(dataResult.startDate).format("DD MMM YYYY");
      setStartDate(formattedStartDate);
      const formattedEndDate =
        dataResult.endDate === "" || dataResult.endDate === "-"
          ? moment().add(1, "weeks").format("DD MMM YYYY")
          : moment(dataResult.endDate).format("DD MMM YYYY");
      setEndDate(formattedEndDate);
    }
  }, [dataResult]);

  const getDetailList = () => {
    console.log("data : ", dataResult);
  };

  const handleCheck = () => {
    console.log("dataResult: ", dataResult);
    console.log("divisionData: ", divisionData);
    console.log("sprintData: ", sprintData);
  };

  const closePage = () => {
    console.log("test : ", dataResult);
    setStartDate(dataResult.startDate);
    setEndDate(dataResult.endDate);
    setStatus(dataResult.status);
    setAdditionalLink(dataResult.additionalLink);
    setLinkId(dataResult.linkId);
    setModalOpen(false);
    setTaskName(dataResult.taskName);
    setTaskDesc(dataResult.taskDesc);
    setActualFinalDate(dataResult.actualFinalDate);
  };

  const saveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      // const data = {
      //   id: dataResult.id,
      //   sprintId: sprintData.id,
      //   divisionId: divisionData.divisionId,
      //   taskName: taskName,
      //   startDate: moment(startDate).format("YYYYMMDD"),
      //   endDate: moment(endDate).format("YYYYMMDD"),
      //   status: status,
      //   taskDesc: taskDesc,
      // };

      let data;
      if (status === "DONE") {
        data = {
          id: dataResult.id,
          sprintId: sprintData.id,
          divisionId: divisionData.divisionId,
          taskName: taskName,
          startDate: moment(startDate).format("YYYYMMDD"),
          endDate: moment(endDate).format("YYYYMMDD"),
          status: status,
          taskDesc: taskDesc,
          actualFinalDate: moment(actualFinalDate).format("YYYYMMDD"),
        };
      } else {
        data = {
          id: dataResult.id,
          sprintId: sprintData.id,
          divisionId: divisionData.divisionId,
          taskName: taskName,
          startDate: moment(startDate).format("YYYYMMDD"),
          endDate: moment(endDate).format("YYYYMMDD"),
          status: status,
          taskDesc: taskDesc,
        };
      }

      const response = await fetch(
        `${config.api_ptms}/sprint/task-division/edit`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        closePage();
        getDataList();
        setNotif("success", responseData.meta.message);
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const closeModal = () => {
    setStartDate(dataResult.startDate);
    setEndDate(dataResult.endDate);
    setStatus(dataResult.status);
    setAdditionalLink(dataResult.additionalLink);
    setLinkId(dataResult.linkId);
    setModalOpen(false);
    setTaskName(dataResult.taskName);
    setTaskDesc(dataResult.taskDesc);
    setActualFinalDate(dataResult.actualFinalDate);
  };

  const handleAddLinkChange = (newValue) => {
    setAdditionalLink(newValue);
  };

  return (
    <ModalCustom
      id="taskDivision-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Task Division Data Edit"
      type="3xl">
      <div className="px-5 py-0">
        <div className="row mb-5">
          {/* ROW 1 */}
          <div className="flex justify-between mt-2">
            <div className="w-1/2 mr-2">
              <TextFieldGlobal
                label="Task Description"
                placeholder="Input Task Description"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                type="standard"
              />
            </div>
            <div className="w-1/2 ml-2 invisible"></div>
          </div>
          {/* ROW 2 */}
          <div className="flex justify-between mt-0">
            <div className="w-1/2 mr-2">
              <DatePickerNew
                label="Start Date"
                value={startDate}
                onChange={(value) => setStartDate(value)}
              />
            </div>
            <div className="w-1/2 ml-2">
              <DatePickerNew
                label="End Date"
                value={endDate}
                onChange={(value) => setEndDate(value)}
              />
            </div>
          </div>
          {/* ROW 3 */}
          <div className="mb-2 mt-2">
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
          {/* ROW 4 */}
          <div className="flex justify-between mt-2">
            <div className="w-1/2 mr-2 mt-1.5">
              <TaskDivisionStatus
                value={status}
                onChange={(newValue) => {
                  setStatus(newValue);
                }}
              />
            </div>
            <div className={status === "DONE" ? "w-1/2 ml-2 -mt-2" : "hidden"}>
              <DatePickerNew
                label="Actual End Date"
                value={actualFinalDate}
                onChange={(value) => setActualFinalDate(value)}
              />
            </div>
          </div>
          {/* BUTTON */}
          <div className="flex flex-wrap justify-end space-x-2 mt-5 mb-5">
            <div className="mr-5 hidden">
              <Button
                type="primary"
                iconName={faCheck}
                text="Check"
                onClick={handleCheck}
              />
            </div>
            <div>
              <Button
                type="primary"
                iconName={faCheck}
                text="Update"
                onClick={(e) => {
                  e.stopPropagation();
                  saveEdit();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalCustom>
  );
}
