import React, { useState, useEffect } from "react";
import ModalBlank from "../../../components/ModalBlank";
import Button from "../../../components/Button";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function DivisionValidation({
  modalOpen,
  setModalOpen,
  isDelete,
  deleteData,
  editData,
}) {
  const handleClick = () => {
    if (isDelete) {
      deleteData();
    } else {
      editData();
    }
  };

  return (
    <div className="m-1.5">
      <ModalBlank
        id="package-validation"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}>
        <div className="p-5 flex space-x-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isDelete ? "bg-rose-100" : "bg-indigo-100"
            }`}>
            <svg
              className={`w-4 h-4 shrink-0 fill-current ${
                isDelete ? "text-red-600" : "text-blue-900"
              }`}
              viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          <div>
            <div className="mb-3 mt-1.5">
              <div className="text-lg font-semibold text-slate-800">
                {isDelete ? "Delete Data" : "Edit Status"}
              </div>
              {/* {dataDelete.toString()} KALO MAU MANGGIL */}
            </div>
            <div className="text-sm">
              <div className="space-y-2">
                <p>
                  {isDelete
                    ? "The data that has been deleted cannot be recovered. Are you sure you want to delete the data?"
                    : "Are you sure you want to change the status of this data?"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* BUTTON */}
        <div className="flex flex-wrap justify-end space-x-2 mb-4 mr-4">
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
            type={isDelete ? "danger" : "primary"}
            iconName={faCircleCheck}
            text={isDelete ? "Yes, Delete it" : "Yes, Do it"}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
              setModalOpen(false);
            }}
          />
        </div>
      </ModalBlank>
    </div>
  );
}
