import React, { useState, useEffect } from "react";
import { faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import WysiwygGlobal from "../../../components/WysiwygGlobal";
import { useStateContext } from "../../../ContextProvider";

export default function SurveyNote({
  modalOpen,
  setModalOpen,
  dataResultSurvey,
  getDataList,
  noteEdit,
  isEditing,
  isEditingSurveyForm,

  dataNote,
}) {
  const [id, setId] = useState(-99);
  const [surveyId, setSurveyId] = useState(-99);
  const [notesTittle, setNotesTittle] = useState("");
  const [notes, setNotes] = useState("");

  const saveAdd = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        surveyId: dataResultSurvey.id,
        notesTittle,
        notes,
      };
      const response = await fetch(`${config.api_ptms}/survey/notes/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      if (response.ok) {
        closeModal();
        getDataList();
        setNotif("success", responseJSON.meta.message);
      } else {
        setNotif("warning", responseJSON.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const handleCheck = async () => {
    console.log("is Editing Form Survey? ", isEditingSurveyForm);
    console.log("is Editing Note? ", isEditing);
  };

  const saveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        id: noteEdit.id,
        surveyId: dataResultSurvey.id,
        notesTittle: notesTittle,
        notes: notes,
      };
      const response = await fetch(`${config.api_ptms}/survey/notes/edit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        closeModal();
        getDataList();
        setNotif("success", responseData.meta.message);
      } else {
        setNotif("warning", responseData.meta.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const saveData = async () => {
    if (isEditingSurveyForm) {
      if (isEditing) {
        saveEdit();
      } else {
        saveAdd();
      }
    } else {
      dataNote(notesTittle, notes);
    }
    return closeModal();
  };

  const closeModal = () => {
    if (isEditing) {
      setModalOpen(false);
      setNotesTittle(noteEdit.notesTittle);
      setNotes(noteEdit.notes);
    } else {
      setModalOpen(false);
      setNotesTittle("");
      setNotes("");
    }
  };

  useEffect(() => {
    if (isEditing) {
      if (noteEdit) {
        setNotesTittle(noteEdit.notesTittle);
        setNotes(noteEdit.notes);
      }
    } else {
      setNotesTittle("");
      setNotes("");
    }
  }, [isEditing, noteEdit]);
  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={
        isEditingSurveyForm
          ? isEditing
            ? "Edit Note"
            : "Add Note"
          : "Add Note"
      }
      type="5xl">
      <div className="px-5 mt-1">
        <div className="flex justify-start">
          <div className="w-1/2">
            <TextFieldGlobal
              label="Title"
              placeholder="Enter Title Note"
              value={notesTittle}
              onChange={(e) => setNotesTittle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-start mt-2">
          <div className="w-full">
            <WysiwygGlobal
              readOnly={false}
              placeholder="Start typing Detail Note here..."
              label="Detail Note"
              maxHeight="500px"
              item={notes}
              setItem={setNotes}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-end space-x-2 mt-5 mb-5">
          <Button
            type="primary"
            iconName={
              isEditingSurveyForm
                ? isEditing
                  ? faCheck
                  : faFloppyDisk
                : faFloppyDisk
            }
            text={
              isEditingSurveyForm ? (isEditing ? "Update" : "Save") : "Save"
            }
            onClick={saveData}
          />
        </div>
      </div>
    </ModalBasic>
  );
}
