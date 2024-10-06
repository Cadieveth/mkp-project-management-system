import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import ModalCustom from "../../../components/ModalCustom";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import { useStateContext } from "../../../ContextProvider";
import { tr } from "date-fns/locale";

function TaskModal({
  isEditing,
  modalOpen,
  setModalOpen,
  dataResult,
  getDataList,
  getDataCount,
  setCurrentPage,
  toPage1,
  setKeyword,
  setStatus,
}) {
  const [taskCode, setTaskCode] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { setNotif, dataTask } = useStateContext();

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.taskCode || "");
      setName(dataResult.taskName || "");
      setDesc(dataResult.description || "");
    }
  }, [dataResult]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const saveData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = isEditing
        ? {
            id: dataResult.id,
            divisionId: dataTask.id,
            taskCode: code,
            taskName: name,
            description: desc,
          }
        : {
            divisionId: dataTask.id,
            taskCode,
            taskName,
            description,
          };

      const url = isEditing
        ? `${config.api_master}/task/edit`
        : `${config.api_master}/task/add`;

      const method = "POST";

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toPage1();
        setNotif("success", responseData.meta.message);
        setTaskCode("");
        setTaskName("");
        setDescription("");
        closeModal();
        getDataList(setCurrentPage, setStatus, setKeyword);
        getDataCount(setCurrentPage, setStatus, setKeyword);
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const closeModal = () => {
    if (isEditing) {
      setName(dataResult.taskName || "");
      setDesc(dataResult.description || "");
      setModalOpen(false);
    } else {
      setTaskCode("");
      setTaskName("");
      setDescription("");
      setModalOpen(false);
    }
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={isEditing ? "Task Data Edit" : "Task Data Add"}
      type="3xl">
      <div className="px-5 py-0">
        <div className="row">
          <div className="flex justify-between mt-2">
            {/* CODE */}
            <div className="mr-2 w-1/2">
              <TextFieldGlobal
                label="Task Code"
                placeholder={isEditing ? "" : "Enter any Task Code"}
                value={isEditing ? code : taskCode}
                onChange={
                  isEditing
                    ? handleCodeChange
                    : (e) => setTaskCode(e.target.value)
                }
                readOnly={isEditing ? true : false}
              />
            </div>
            {/* NAME */}
            <div className="w-1/2 ml-2">
              <TextFieldGlobal
                label="Task Name"
                placeholder={isEditing ? "" : "Enter any Name for the Task"}
                value={isEditing ? name : taskName}
                onChange={
                  isEditing
                    ? handleNameChange
                    : (e) => setTaskName(e.target.value)
                }
              />
            </div>
          </div>
          {/* DESC */}
          <div className="w-full mt-2">
            <TextFieldGlobal
              label="Description"
              placeholder={isEditing ? "" : "Enter any Task Description"}
              value={isEditing ? desc : description}
              onChange={
                isEditing
                  ? handleDescChange
                  : (e) => setDescription(e.target.value)
              }
              multiline={true}
              rows={2}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-end space-x-2 mb-5 mt-5">
          <Button
            type="primary"
            iconName={isEditing ? faCheck : faFloppyDisk}
            text={isEditing ? "Update" : "Save"}
            onClick={saveData}
          />
        </div>
      </div>
    </ModalBasic>
  );
}

export default TaskModal;
