import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
import ModalBasic from "../../../components/ModalBasic";
import Banner2 from "../../../components/Banner2";
import config from "../../../../config";
import Button from "../../../components/Button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function PackageCategoryEdit({
  modalOpen,
  setModalOpen,
  dataResult,
  getPackageList,
  getPackageCount,
  setCurrentPage,
  setKeyword,
  setStatus,
  toPage1,
}) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const { setNotif } = useStateContext();

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.projectCtgrCode || "");
      setName(dataResult.projectCtgrName || "");
    }
  }, [dataResult]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const saveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const requestBody = JSON.stringify({
        id: dataResult.id,
        projectCtgrCode: code,
        projectCtgrName: name,
      });

      const response = await fetch(`${config.api_master}/project-ctgr/edit`, {
        method: "POST",
        headers: headers,
        body: requestBody,
      });
      const responseData = await response.json();

      if (response.ok) {
        getPackageList(setCurrentPage, setStatus, setKeyword);
        getPackageCount(setCurrentPage, setStatus, setKeyword);
        setNotif("success", responseData.meta.message);
        closeModal();
        toPage1();
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setNotif("error", error.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Edit Data Package">
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="code">
              Package Category Code<span className="text-rose-500">*</span>
            </label>
            <input
              id="code"
              name="code"
              className="form-input w-full px-2 py-1  disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
              type="text"
              value={code}
              onChange={handleCodeChange}
              required
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Package Category Name<span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              className="form-input w-full px-2 py-1"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-begin space-x-2 mt-5">
          <Button
            type="primary"
            iconName={faCheck}
            text="Save"
            onClick={saveEdit}
          />
        </div>
      </div>
    </ModalBasic>
  );
}

export default PackageCategoryEdit;
