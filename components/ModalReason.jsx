import React, { useState, useEffect } from "react";
import {
  faCheck,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "./ModalBasic";
import Button from "./Button";
import config from "../../config";
import TextFieldGlobal from "./TextFieldGlobal";
import { useStateContext } from "../ContextProvider";
import ModalBlank from "./ModalBlank";

function ModalReason({
  modalOpen,
  setModalOpen,
  saveAdd,
  saveEdit,
  isEditing,
}) {
  const [reason, setReason] = useState("");
  const [dataToSend, setDataToSend] = useState({
    reason: "",
    // Tambahkan data lain yang diperlukan
  });
  const [error, setError] = useState(false);

  const closeModal = () => {
    setReason("");
    setError(false);
    setModalOpen(false);
  };

  const handleSaveReason = () => {
    // Cek apakah reason kosong
    if (!reason.trim()) {
      setError(true);
      return;
    }

    // Lanjutkan dengan mengirim data ke API
    saveAdd(reason);
    setReason("");
    setError(false); // Reset error setelah data terkirim

    // Tutup modal setelah data terkirim
    closeModal();
  };

  const handleButtonReason = () => {
    // Cek apakah reason kosong
    if (!reason.trim()) {
      setError(true);
      return;
    }

    if (isEditing) {
      saveEdit(reason);
    } else {
      saveAdd(reason);
    }

    setReason("");
    setError(false); // Reset error setelah data terkirim
    closeModal();
  };

  return (
    <ModalBlank
      id="reason-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Reason"
      type="lg">
      <div className="px-0 py-0">
        <div className="mt-3.5">
          <div className="flex justify-end">
            <Button
              type="bigIcon"
              iconName={faXmark}
              onClick={closeModal}
              iconSize="text-lg"
              titleTooltip="Cancel"
            />
          </div>
        </div>
        <div className="px-6">
          <div>
            <TextFieldGlobal
              label="Reason"
              placeholder="Type your reason here..."
              multiline={true}
              rows={4}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError(false); // Reset error saat mengubah nilai
              }}
              type="standard"
              helperText={error ? "Reason cannot be empty" : null}
              errorText={error}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-end space-x-2 mt-5 mb-5 mr-5">
          <div>
            <Button
              type="primary"
              iconName={isEditing ? faCheck : faFloppyDisk}
              text={isEditing ? "Update" : "Save"}
              onClick={handleButtonReason}
            />
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}

export default ModalReason;
