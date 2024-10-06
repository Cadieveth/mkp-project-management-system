import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import { useStateContext } from "../../../ContextProvider";

function AccountModal({
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
  const [accountCode, setAccountCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const { setNotif } = useStateContext();

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.accountCode || "");
      setName(dataResult.accountName || "");
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
            accountCode: code,
            accountName: name,
          }
        : {
            accountCode,
            accountName,
          };

      const url = isEditing
        ? `${config.api_master}/account/edit`
        : `${config.api_master}/account/add`;

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
        setAccountCode("");
        setAccountName("");
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
      setName(dataResult.accountName || "");
      setModalOpen(false);
    } else {
      setAccountCode("");
      setAccountName("");
      setModalOpen(false);
    }
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={isEditing ? "Account Data Edit" : "Account Data Add"}
      type="lg">
      <div className="px-5 py-0">
        <div className="mt-2">
          <TextFieldGlobal
            label="Account Code"
            placeholder={isEditing ? "" : "Enter any Account Code"}
            value={isEditing ? code : accountCode}
            onChange={
              isEditing
                ? handleCodeChange
                : (e) => setAccountCode(e.target.value)
            }
            readOnly={isEditing ? true : false}
          />
        </div>
        <div className="mt-2">
          <TextFieldGlobal
            label="Account Name"
            placeholder={isEditing ? "" : "Enter any Name for Account"}
            value={isEditing ? name : accountName}
            onChange={
              isEditing
                ? handleNameChange
                : (e) => setAccountName(e.target.value)
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

export default AccountModal;
