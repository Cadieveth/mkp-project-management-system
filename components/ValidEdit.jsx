import React, { useState } from "react";
import ModalBlank from "./ModalBlank";
import Button from "./Button";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../ContextProvider";

function ValidEdit({
  modalOpen,
  setModalOpen,
  dataEdit,
  setCurrentPage,
  apiUrl,
  setKeyword,
  setStatus,
  getDataList,
  getDataCount,
  setData,
  toPage1,
}) {
  const { setNotif } = useStateContext();

  const editActive = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Status has been updated for ID ${dataEdit}.`);
        setModalOpen(false);
        toPage1();
        getDataList(setData, setCurrentPage);
        getDataCount(setData, setCurrentPage);
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  return (
    <div className="m-1.5">
      <ModalBlank
        id="info-modal"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}>
        <div className="p-5 flex space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-blue-900"
              viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
          <div>
            <div className="mb-3 mt-1.5">
              <div className="text-lg font-semibold text-slate-800">
                Edit Status
              </div>
            </div>
            <div className="text-sm mb-5">
              <div className="space-y-2">
                <p>Are you sure you want to change the status of this data?</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-end space-x-2 -mr-10">
              <Button
                type="tertiary"
                iconName={faBan}
                text="Cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(false);
                }}
              />
              <Button
                type="primary"
                iconName={faCircleCheck}
                text="Yes, Do it"
                onClick={() => editActive()}
              />
            </div>
          </div>
        </div>
      </ModalBlank>
    </div>
  );
}

export default ValidEdit;
