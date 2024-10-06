import React, { useState } from "react";
import { useStateContext } from "../../../ContextProvider";
import ModalBasic from "../../../components/ModalBasic";
import Banner2 from "../../../components/Banner2";
import config from "../../../../config";
import Button from "../../../components/Button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function AccountAdd({
  modalOpen,
  setModalOpen,
  getDataList,
  getDataCount,
  setCurrentPage,
  setKeyword,
  setStatus,
  toPage1,
}) {
  const [accountCode, setAccountCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const { setNotif } = useStateContext();

  async function addAccount() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        accountCode,
        accountName,
      };

      const response = await fetch(`${config.api_master}/account/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toPage1();
        setNotif("success", responseData.meta.message);
        setAccountCode("");
        setAccountName("");
        closeModal();
        getDataList(setCurrentPage, "");
        getDataCount(setCurrentPage, "");
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  }

  const closeModal = () => {
    setAccountCode("");
    setAccountName("");
    setModalOpen(false);
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Add Account">
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="code">
              Account Code<span className="text-rose-500">*</span>
            </label>
            <input
              id="code"
              className="form-input w-full px-2 py-1"
              type="text"
              required
              value={accountCode}
              onChange={(e) => setAccountCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Account Name<span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              className="form-input w-full px-2 py-1"
              type="text"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-begin space-x-2 mt-5">
          <Button
            type="primary"
            iconName={faCheck}
            text="Save"
            onClick={addAccount}
          />
        </div>
      </div>
    </ModalBasic>
  );
}

export default AccountAdd;
