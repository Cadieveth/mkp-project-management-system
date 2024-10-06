import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useStateContext } from "../../ContextProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import moment from "moment/moment";
import config from "../../../config";
import DraggableCard from "./DraggableCard";
import DroppableWidget from "./DroppableWidget";
import { handleTokenExpired } from "../../utils/Utils";
import ModalDate from "../../components/ModalDate";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TaskDivisionModalAdd from "../acquisition/TaskSprint/TaskDivisionModalAdd";

export default function DragNDrop() {
  const { setLoadingState, setNotif, divisionId, openViaDivision, taskSprint } =
    useStateContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [comboList, setComboList] = useState([]);
  const [isDnD, setIsDnD] = useState(false);
  const [modalDateOpen, setModalDateOpen] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openFromDefault, setOpenFromDefault] = useState(false);
  const [id, setId] = useState(0);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

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
        setTaskList(data.result);
        // setNotif("success", data.meta.message);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const getComboList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/combo/list?comboId=STATUSTASK`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setComboList(data.result);
        console.log();
        data.meta.message;
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          console.log();
          data.meta.message;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = async (item, status) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      let data;
      if (status === "DONE") {
        setId(item.id);
        setStatus(status);
        setModalDateOpen(true);
      } else {
        data = {
          id: item.id,
          status: status,
        };
      }
      const response = await fetch(
        `${config.api_ptms}/sprint/task-division/edit-status`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        getTaskDivisionList();
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCheck = () => {
    console.log("divisionId: ", divisionId);
    console.log("openViaDivision: ", openViaDivision);
    console.log("taskSprint: ", taskSprint);
  };

  const closePage = () => {
    navigate("/sprint/Division");
  };

  const handleClickDefault = () => {
    console.log("Default di klik");
    setOpenModalAdd(true);
    setOpenFromDefault(true);
  };

  const handleClickUnique = () => {
    console.log("Unique di klik");
    setOpenModalAdd(true);
    setOpenFromDefault(false);
  };

  useEffect(() => {
    getTaskDivisionList();
    getComboList();
  }, []);

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
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
                        <div className="flex mt-2 justify-between">
                          <div className="w-full">
                            <div
                              id="header-page"
                              className="flex justify-between mb-5">
                              <div>
                                <div className="text-2xl md:text-2xl text-slate-800 font-bold">
                                  Drag & Drop Task Division{" "}
                                  {divisionId.divisionName}
                                </div>
                                <div className="text-sm">
                                  {" "}
                                  Sprint {taskSprint.sprintCode}
                                </div>
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
                            <div className="flex justify-end mb-2">
                              <div id="button-default" className="mr-2">
                                <Button
                                  type="primary"
                                  iconName={faPlus}
                                  text="Add Task by Default"
                                  onClick={(e) => {
                                    e.stopPropagation;
                                    handleClickDefault();
                                  }}
                                />
                              </div>
                              <div id="button-unique">
                                <Button
                                  type="primary"
                                  iconName={faPlus}
                                  text="Add Unique Task"
                                  onClick={(e) => {
                                    e.stopPropagation;
                                    handleClickUnique();
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <DroppableWidget
                                dataCombo={comboList}
                                dataTask={taskList}
                                handleDrop={handleDrop}
                                divisionId={divisionId}
                                taskSprint={taskSprint}
                                getTaskDivisionList={getTaskDivisionList}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="hidden">
                          <Button
                            type="tertiary"
                            text="check"
                            onClick={handleCheck}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <ModalDate
            modalOpen={modalDateOpen}
            setModalOpen={setModalDateOpen}
            id={id}
            status={status}
            getDataList={getTaskDivisionList}
          />
          <TaskDivisionModalAdd
            modalOpen={openModalAdd}
            setModalOpen={setOpenModalAdd}
            sprintId={taskSprint.id}
            divisionId={divisionId.divisionId}
            getTaskDivisionList={getTaskDivisionList}
            openFromDefault={openFromDefault}
          />
        </div>
      </DndProvider>
    </main>
  );
}
