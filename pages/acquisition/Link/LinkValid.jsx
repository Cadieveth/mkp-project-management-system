import React, { useState } from "react";
import ModalBlank from "../../../components/ModalBlank";
import Button from "../../../components/Button";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../../ContextProvider";

function LinkValid({ modalOpen, setModalOpen, getDataList, apiUrl }) {
  const { setNotif, setLoadingState } = useStateContext();

  const deleteData = async () => {
    setLoadingState(true);
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
        setModalOpen(false);
        getDataList();
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  return (
    <div className="m-1.5">
      <ModalBlank
        id="danger-modal"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}>
        <div className="p-5 flex space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-rose-500"
              viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          <div>
            <div className="mb-2 mt-1.5">
              <div className="text-lg font-semibold text-slate-800">
                Delete Data
              </div>
            </div>
            <div className="text-sm mb-5">
              <div className="space-y-2">
                <p>
                  The data that has been deleted cannot be recovered. Are you
                  sure you want to delete the data?
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-end space-x-2">
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
                type="danger"
                iconName={faCircleCheck}
                text="Yes, Delete it"
                onClick={deleteData}
              />
            </div>
          </div>
        </div>
      </ModalBlank>
    </div>
  );
}

export default LinkValid;
