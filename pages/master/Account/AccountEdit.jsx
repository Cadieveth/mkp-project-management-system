import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
import ModalBasic from "../../../components/ModalBasic";
import Banner2 from "../../../components/Banner2";
import config from "../../../../config";
import Button from "../../../components/Button";
import ModalGlobal from "../../../components/ModalGlobal";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function AccountEdit({
  modalOpen,
  setModalOpen,
  dataResult,
  getDataList,
  getDataCount,
  setCurrentPage,
  setKeyword,
  setStatus,
  toPage1,
}) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const { setNotif } = useStateContext();

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
        accountCode: code,
        accountName: name,
      });

      const response = await fetch(`${config.api_master}/account/edit`, {
        method: "POST",
        headers: headers,
        body: requestBody,
      });
      const data = await response.json();

      if (response.ok) {
        getDataList(setCurrentPage, setStatus, setKeyword);
        getDataCount(setCurrentPage, setStatus, setKeyword);
        toPage1();
        closeModal();
        setNotif("success", responseData.meta.message);
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

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.accountCode || "");
      setName(dataResult.accountName || "");
    }
  }, [dataResult]);

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Edit Data Account">
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="code">
              Account Code<span className="text-rose-500">*</span>
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
              Account Name<span className="text-rose-500">*</span>
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

export default AccountEdit;
