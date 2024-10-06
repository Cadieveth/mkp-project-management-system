import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import { useStateContext } from "../../../ContextProvider";

function PackageCategoryModal({
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
    if (isEditing) {
      setName(dataResult.projectCtgrName || "");
      setModalOpen(false);
    } else {
      setProjectCtgrCode("");
      setProjectCtgrName("");
      setModalOpen(false);
    }
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={isEditing ? "Product Data Edit" : "Product Data Add"}
      type="lg">
      <div className="px-5 py-0">
        <div className="mt-2">
          <TextFieldGlobal
            label="Product Category Code"
            placeholder={isEditing ? "" : "Enter any Product Category Code"}
            value={isEditing ? code : projectCtgrCode}
            onChange={
              isEditing
                ? handleCodeChange
                : (e) => setProjectCtgrCode(e.target.value)
            }
            readOnly={isEditing ? true : false}
          />
        </div>
        <div className="mt-2">
          <TextFieldGlobal
            label="Product Category Name"
            placeholder={isEditing ? "" : "Enter any Name for Product Category"}
            value={isEditing ? name : projectCtgrName}
            onChange={
              isEditing
                ? handleNameChange
                : (e) => setProjectCtgrName(e.target.value)
            }
          />
        </div>
        <div className="flex flex-wrap justify-end space-x-2 mt-5 mb-5">
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

export default PackageCategoryModal;
