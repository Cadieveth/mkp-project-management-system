import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import { useStateContext } from "../../../ContextProvider";

function LinkModal({
  dataSprint,
  isEditing,
  modalOpen,
  setModalOpen,
  dataResult,
  getDataList,
}) {
  const [linkCode, setLinkCode] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");
  const [titleSprint, setTitleSprint] = useState("");
  const [linkSprint, setLinkSprint] = useState("");
  const { setLoadingState, setNotif } = useStateContext();

  const closeModal = () => {
    if (isEditing) {
      setCode(dataResult.linkCode || "");
      setTitleSprint(dataResult.title || "");
      setLinkSprint(dataResult.link || "");
      setModalOpen(false);
    } else {
      setLinkCode("");
      setTitle("");
      setLink("");
      setModalOpen(false);
    }
  };

  const saveData = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = isEditing
        ? {
            id: dataResult.id,
            sprintId: dataSprint.id,
            title: titleSprint,
            link: linkSprint,
          }
        : {
            sprintId: dataSprint.id,
            title,
            link,
          };

      const url = isEditing
        ? `${config.api_ptms}/sprint/link/edit`
        : `${config.api_ptms}/sprint/link/add`;

      const method = "POST";

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setNotif("success", responseData.meta.message);
        setLinkCode("");
        setTitle("");
        setLink("");
        closeModal();
        getDataList();
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const handleTitleChange = (e) => {
    setTitleSprint(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLinkSprint(e.target.value);
  };

  useEffect(() => {
    if (dataResult) {
      setCode(dataResult.linkCode || "");
      setTitleSprint(dataResult.title || "");
      setLinkSprint(dataResult.link || "");
    }
  }, [dataResult]);

  return (
    <ModalBasic
      id="limk-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={isEditing ? "Link Sprint Data Edit" : "Link Sprint Data Add"}
      type={isEditing ? "3xl" : "lg"}>
      <div className="px-5 py-0">
        <div className="row mb-5">
          <div className="flex justify-between mt-2">
            {/* LINK CODE */}
            <div className={isEditing ? "mr-2 w-1/2" : "hidden"}>
              <div className={isEditing ? "visible" : "invisible"}>
                <TextFieldGlobal
                  label="Link Sprint Code"
                  value={isEditing ? code : linkCode}
                  readOnly={isEditing ? true : false}
                />
              </div>
            </div>
            {/* TITLE */}
            <div className={isEditing ? "w-1/2 ml-2" : "w-full"}>
              <TextFieldGlobal
                label="Title"
                placeholder="Enter any Title"
                value={isEditing ? titleSprint : title}
                onChange={
                  isEditing
                    ? handleTitleChange
                    : (e) => setTitle(e.target.value)
                }
              />
            </div>
          </div>
          {/* LINK */}
          <div className="w-full mt-2">
            <TextFieldGlobal
              label="Link"
              placeholder="Enter Your URL Link here..."
              value={isEditing ? linkSprint : link}
              onChange={
                isEditing ? handleLinkChange : (e) => setLink(e.target.value)
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

export default LinkModal;
