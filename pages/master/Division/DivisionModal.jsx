import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import { useStateContext } from "../../../ContextProvider";

function DivisionModal({
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
  const [divisionCode, setDivisionCode] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const { setNotif } = useStateContext();

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.divisionCode || "");
      setName(dataResult.divisionName || "");
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
            divisionCode: code,
            divisionName: name,
          }
        : {
            divisionCode,
            divisionName,
          };

      const url = isEditing
        ? `${config.api_master}/division/edit`
        : `${config.api_master}/division/add`;

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
        setDivisionCode("");
        setDivisionName("");
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
      setName(dataResult.divisionName || "");
      setModalOpen(false);
    } else {
      setDivisionCode("");
      setDivisionName("");
      setModalOpen(false);
    }
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={isEditing ? "Division Data Edit" : "Division Data Add"}
      type="lg">
      <div className="px-5 py-0">
        <div className="mt-2">
          <TextFieldGlobal
            label="Division Code"
            placeholder={isEditing ? "" : "Enter any Division Code"}
            value={isEditing ? code : divisionCode}
            onChange={
              isEditing
                ? handleCodeChange
                : (e) => setDivisionCode(e.target.value)
            }
            readOnly={isEditing ? true : false}
          />
        </div>
        <div className="mt-2">
          <TextFieldGlobal
            label="Division Name"
            placeholder={isEditing ? "" : "Enter any Name for Division"}
            value={isEditing ? name : divisionName}
            onChange={
              isEditing
                ? handleNameChange
                : (e) => setDivisionName(e.target.value)
            }
          />
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

export default DivisionModal;
