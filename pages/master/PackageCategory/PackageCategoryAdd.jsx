import React, { useState } from "react";
import { useStateContext } from "../../../ContextProvider";
import ModalBasic from "../../../components/ModalBasic";
import Banner2 from "../../../components/Banner2";
import config from "../../../../config";
import Button from "../../../components/Button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function PackageCategoryAdd({
  modalOpen,
  setModalOpen,
  getPackageCount,
  getPackageList,
  setCurrentPage,
  toPage1,
}) {
  const [projectCtgrCode, setProjectCtgrCode] = useState("");
  const [projectCtgrName, setProjectCtgrName] = useState("");
  const { setNotif } = useStateContext();

  async function addPackage() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const data = {
        projectCtgrCode,
        projectCtgrName,
      };

      const response = await fetch(`${config.api_master}/project-ctgr/add`, {
        method: "POST",
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
        getPackageList(setCurrentPage, "");
        getPackageCount(setCurrentPage, "");
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  }

  const closeModal = () => {
    setProjectCtgrCode("");
    setProjectCtgrName("");
    setModalOpen(false);
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Add Data Package">
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="code">
              Product Category Code<span className="text-rose-500">*</span>
            </label>
            <input
              id="code"
              className="form-input w-full px-2 py-1"
              type="text"
              required
              value={projectCtgrCode}
              onChange={(e) => setProjectCtgrCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Product Category Name<span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              className="form-input w-full px-2 py-1"
              type="text"
              required
              value={projectCtgrName}
              onChange={(e) => setProjectCtgrName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-begin space-x-2 mt-5">
          <Button
            type="primary"
            iconName={faCheck}
            text="Save"
            onClick={addPackage}
          />
        </div>
      </div>
    </ModalBasic>
  );
}

export default PackageCategoryAdd;
