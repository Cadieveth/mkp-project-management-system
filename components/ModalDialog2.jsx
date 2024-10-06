import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "./ModalBasic";
import config from "../../config";
import Button from "./Button";
import { useStateContext } from "../ContextProvider";

function ModalDialog2({
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
  const [projectCtgrCode, setProjectCtgrCode] = useState("");
  const [projectCtgrName, setProjectCtgrName] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const { setNotif } = useStateContext();

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.projectCtgrCode || "");
      setName(dataResult.projectCtgrName || "");
      console.log("dataResult yang diterima: ", dataResult);
    }
  }, [dataResult]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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
            projectCtgrCode: code,
            projectCtgrName: name,
          }
        : {
            projectCtgrCode,
            projectCtgrName,
          };

      const url = isEditing
        ? `${config.api_master}/project-ctgr/edit`
        : `${config.api_master}/project-ctgr/add`;

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
        setProjectCtgrCode("");
        setProjectCtgrName("");
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
    setProjectCtgrCode("");
    setProjectCtgrName("");
    setCode(code);
    setName(name);
    setModalOpen(false);
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={isEditing ? "Edit Data Package" : "Add Data Package"}>
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="code">
              Package Category Code<span className="text-rose-500">*</span>
            </label>
            <input
              id="code"
              className={
                isEditing
                  ? "form-input w-full px-2 py-1  disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  : "form-input w-full px-2 py-1"
              }
              type="text"
              required
              disabled={isEditing}
              value={isEditing ? code : projectCtgrCode}
              onChange={
                isEditing
                  ? handleCodeChange
                  : (e) => setProjectCtgrCode(e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Package Category Name<span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              className="form-input w-full px-2 py-1"
              type="text"
              required
              value={isEditing ? name : projectCtgrName}
              onChange={
                isEditing
                  ? handleNameChange
                  : (e) => setProjectCtgrName(e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-begin space-x-2 mt-5">
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

export default ModalDialog2;
