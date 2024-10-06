import React, { useState, useEffect } from "react";
import {
  faCheck,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import DatePickerNew from "./DatePickerNew";
import ModalBlank from "./ModalBlank";
import ModalCustom from "./ModalCustom";
import moment from "moment/moment";
import config from "../../config";

export default function ModalDate({
  modalOpen,
  setModalOpen,
  id,
  status,
  getDataList,
}) {
  const [date, setDate] = useState(moment().format("DD MMM YYYY"));
  const [error, setError] = useState(false);

  const closeModal = () => {
    setDate(moment().format("DD MM YYYY"));
    setError(false);
    setModalOpen(false);
  };

  const handleButtonReason = () => {
    if (!date.trim()) {
      setError(true);
      return;
    }
    closeModal();
  };

  const handleChange = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const formattedDate = moment(date, "DD MMM YYYY").format("YYYYMMDD");

      const data = {
        id: id,
        status: status,
        actualFinalDate: formattedDate,
      };

      const response = await fetch(
        `${config.api_ptms}/sprint/task-division/edit-status`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );
      const responseJSON = await response.json();
      if (response.ok) {
        getDataList();
        console.log(responseJSON.meta.message);
      } else {
        console.log(responseJSON.meta.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalCustom
      id="finalDate-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="now"
      type="lg">
      <div>
        <div id="content" className="px-5 mt-2">
          <DatePickerNew
            label="Final Date"
            value={date}
            onChange={(value) => setDate(value)}
          />
        </div>
        <div
          id="footer-button"
          className="flex flex-wrap justify-end space-x-2 mt-5 mb-5 mr-5">
          <Button
            type="primary"
            iconName={faFloppyDisk}
            text="Save"
            onClick={(e) => {
              handleChange();
              setModalOpen(false);
            }}
          />
        </div>
      </div>
    </ModalCustom>
  );
}
