import React from "react";
import { useDrag } from "react-dnd";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, IconButton } from "@mui/material";
import { useState } from "react";
import TaskDivisionModalLink from "../acquisition/TaskSprint/TaskDivisionModalLink";
import config from "../../../config";
import LinkValid from "../acquisition/Link/LinkValid";
import TaskDivisionModal from "../acquisition/TaskSprint/TaskDivisionModal";

export default function DraggableCard({
  taskData,
  handleDrop,
  divisionId,
  taskSprint,
  getTaskDivisionList,
}) {
  const [modalLinkOpen, setModalLinkOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataDelete, setDataDelete] = useState({});
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const {
    id,
    taskName,
    status,
    taskDesc,
    startDate,
    endDate,
    totalLink,
    actualFinalDate,
  } = taskData;

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const openLinkModal = (item) => {
    setSelectedItem(item);
    setModalLinkOpen(true);
  };

  const handleDeleteData = (item) => {
    setDataDelete(item.id);
    setValidDelModalOpen(true);
  };

  const handleCardClick = (taskData) => {
    console.log("card di klik");
    setDataEdit(taskData);
    setEditModalOpen(true);
  };

  const handleClickAttachment = () => {
    console.log("asd");
  };

  return (
    <div
      ref={drag}
      id={`card-${id}`}
      className={`bg-white w-full p-1 rounded-lg mb-2 ${
        isDragging ? "opacity-50" : ""
      }`}>
      <div
        id="main-card"
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick(taskData);
        }}
        style={{ cursor: "pointer" }}>
        <div id="card-header" className="flex justify-between text-xs">
          <div className="ml-1">
            <FontAwesomeIcon
              icon={faCircle}
              style={{
                color:
                  status === "DONE"
                    ? "#00c700"
                    : status === "TODO"
                    ? "#1930ff"
                    : "#d9e000",
              }}
            />
          </div>
          <div
            className="underline text-blue-500"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              openLinkModal(taskData);
            }}>
            <Tooltip title="Edit Task" placement="left">
              Attachment({totalLink})
            </Tooltip>
          </div>
        </div>
        <div id="card-content" className="px-7 py-2 flex justify-between">
          <div>
            <div className="font-bold text-lg">{taskName}</div>
            <div className="-mt-1.5 text-sm">
              {taskDesc !== "" ? taskDesc : "No Available Task Description"}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteData(taskData);
              }}>
              <Tooltip title="Delete Task" placement="left">
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ fontSize: "14px", color: "#ff0000" }}
                />
              </Tooltip>
            </IconButton>
          </div>
        </div>
        <div id="card-footer" className="flex justify-between">
          <div className="py-1 ml-2 flex text-xs font-bold">
            Start Date:{" "}
            <span className="font-normal ml-2">
              {startDate !== "" ? moment(startDate).format("DD MMM YYYY") : "-"}
            </span>
          </div>
          <div className="py-1 mr-2 flex text-xs font-bold">
            End Date:{" "}
            {/* <span className="font-normal ml-2">
              {actualFinalDate !== ""
                ? moment(actualFinalDate).format("DD MMM YYYY")
                : moment(endDate).format("DD MMM YYYY")}
            </span> */}
            <span className="font-normal ml-2">
              {endDate !== "" ? moment(endDate).format("DD MMM YYYY") : "-"}
            </span>
          </div>
        </div>
        <div
          className={
            actualFinalDate
              ? "flex justify-end text-xs font-bold mr-2"
              : "hidden"
          }>
          Actual Final Date:{" "}
          <span className="font-normal ml-2">
            {actualFinalDate !== ""
              ? moment(actualFinalDate).format("DD MMM YYYY")
              : "-"}
          </span>
        </div>
      </div>
      <TaskDivisionModalLink
        modalOpen={modalLinkOpen}
        setModalOpen={setModalLinkOpen}
        taskData={selectedItem}
        divisionData={divisionId}
        sprintData={taskSprint}
        getList={getTaskDivisionList}
      />
      <LinkValid
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        getDataList={getTaskDivisionList}
        apiUrl={`${config.api_ptms}/sprint/task-division/remove/${dataDelete}`}
      />
      <TaskDivisionModal
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        dataResult={dataEdit}
        divisionData={divisionId}
        sprintData={taskSprint}
        getDataList={getTaskDivisionList}
      />
    </div>
  );
}
