import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import { useStateContext } from "../../../ContextProvider";

function ProbabilityModal({
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
  const [probabilityCode, setProbabilityCode] = useState("");
  const [probabilityName, setProbabilityName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { setNotif } = useStateContext();

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.probabilityCode || "");
      setName(dataResult.probabilityName || "");
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
            probabilityCode: code,
            probabilityName: name,
            description: desc,
          }
        : {
            probabilityCode,
            probabilityName,
            description,
          };

      const url = isEditing
        ? `${config.api_master}/probability/edit`
        : `${config.api_master}/probability/add`;

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
        setProbabilityCode("");
        setProbabilityName("");
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
      setName(dataResult.probabilityName || "");
      setDesc(dataResult.description || "");
      setModalOpen(false);
    } else {
      setProbabilityCode("");
      setProbabilityName("");
      setDescription("");
      setModalOpen(false);
    }
  };

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={isEditing ? "Probability Data Edit" : "Probability Data Add"}
      type="3xl">
      <div className="px-5 py-0">
        <div className="row mb-5">
          <div className="flex justify-between mt-2">
            {/* CODE */}
            <div className="mr-2 w-1/2">
              <TextFieldGlobal
                label="Probability Code"
                placeholder={isEditing ? "" : "Enter any Probability Code"}
                value={isEditing ? code : probabilityCode}
                onChange={
                  isEditing
                    ? handleCodeChange
                    : (e) => setProbabilityCode(e.target.value)
                }
                readOnly={isEditing ? true : false}
              />
            </div>
            {/* NAME */}
            <div className="w-1/2 ml-2">
              <TextFieldGlobal
                label="Probability Name"
                placeholder={isEditing ? "" : "Enter any Name for Probability"}
                value={isEditing ? name : probabilityName}
                onChange={
                  isEditing
                    ? handleNameChange
                    : (e) => setProbabilityName(e.target.value)
                }
              />
            </div>
          </div>
          {/* DESC */}
          <div className="w-full mt-2">
            <TextFieldGlobal
              label="Description"
              placeholder={isEditing ? "" : "Enter any Probability Description"}
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

export default ProbabilityModal;
