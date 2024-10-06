import React, { useEffect, useState } from "react";
import ModalCustom from "../../../components/ModalCustom";
import Button from "../../../components/Button";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ModalGlobal from "../../../components/ModalGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faPenToSquare,
  faTrash,
  faLock,
  faLockOpen,
  faEllipsis,
  faFileLines,
  faFileCirclePlus,
  faFileExport,
  faCheckToSlot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import PaginationGlobal from "../../../components/PaginationGlobal";
import config from "../../../../config";
import PicCommDropdown from "../../master/Partner/PicCommDropdown";
import PicInternalDropdown from "../../master/Partner/PicInternalDropdown";

function MomEdit({
  modalOpen,
  setModalOpen,
  dataEdit,
  dataMoM,
  itemPack,
  getDataList,
  getDataCount,
  setCurrentPage,
}) {
  // const [meetingNo, setMeetingNo] = useState(dataEdit.meetingNo);
  // const [meetingDate, setMeetingDate] = useState(dataEdit.meetingDate);
  // const [topic, setTopic] = useState(dataEdit.topic);
  // const [picInternal, setPicInternal] = useState(dataEdit.picInternal);
  // const [picExternal, setPicExternal] = useState(dataEdit.picExternal);
  // const [remark, setRemark] = useState(dataEdit.remark);
  // const [tags, setTags] = useState(dataEdit.tags);

  const [dataSend, setDataSend] = useState({});
  useEffect(() => {
    console.log("dataEdit", dataEdit);
    setDataSend(dataEdit);
  }, [dataEdit]);

  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const SaveEdit = async () => {
    const dataToSend = {
      id: dataEdit.id,
      sprintId: dataEdit.sprintId,
      meetingNo: dataSend.meetingNo,
      meetingDate: dataSend.meetingDate,
      topic: dataSend.topic,
      picInternal: dataSend.picInternal,
      picExternal: dataSend.picExternal,
      remark: dataSend.remark,
      tags: dataSend.tags,
    };
    console.log(dataToSend);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const requestBody = JSON.stringify({
        id: dataEdit.id,
        sprintId: dataEdit.sprintId,
        meetingNo: dataSend.meetingNo,
        meetingDate: dataSend.meetingDate,
        topic: dataSend.topic,
        picInternal: dataSend.picInternal,
        picExternal: dataSend.picExternal,
        remark: dataSend.remark,
        tags: dataSend.tags,
      });

      const response = await fetch(`${config.api_ptms}/mom/edit`, {
        method: "POST",
        headers: headers,
        body: requestBody,
      });
      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.meta.message);
        closeModal();
        getDataList(setCurrentPage);
        getDataCount(setCurrentPage);
      } else {
        setInfoMessage(responseData.meta.message);
      }
    } catch (error) {
      setErrorMessage(error);
      console.error("Error:", error);
    }
  };

  // console.log("Isi itemPack dari MomEdit: ", itemPack);
  // console.log("Isi dataMOM dari MomEdit: ", dataMoM);
  // console.log("Isi dataEdit dari MomEdit: ", dataEdit);
  // console.log("dari edit:", dataMoM);

  const formatDateForInput = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${year}-${month}-${day}`;
  };

  const removeDashesFromDate = (date) => {
    return date.replace(/-/g, ""); // Menghapus semua tanda strip
  };

  return (
    <div className="m-1.5">
      <ModalCustom
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        maxWidth={"max-w-xl"}>
        <div className="p-5 flex space-x-4 justify-center">
          <div>
            <div className="mb-2">
              <div className="text-lg text-center font-semibold text-slate-800">
                Edit Minute of Meeting
              </div>
            </div>
            <div>
              {/* ROW 1 */}
              <div className="flex mb-10 justify-begin">
                <div className="mr-4">
                  <div className="w-96">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="sprintCode">
                      Sprint No.
                    </label>
                    <input
                      id="sprintCode"
                      name="sprintCode"
                      className="form-input w-full  disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                      type="text"
                      disabled
                      value={itemPack.sprintCode}
                    />
                  </div>
                </div>
              </div>
              {/* ROW 2 */}
              <div className="flex mb-5 justify-center">
                <div className="mr-4">
                  <div className="w-96">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="meetingNo">
                      Meeting No.
                    </label>
                    <input
                      id="meetingNo"
                      name="meetingNo"
                      className="form-input w-full"
                      placeholder="Input any Meeting Number"
                      type="text"
                      defaultValue={dataSend.meetingNo}
                      onChange={(e) =>
                        setDataSend({ ...dataSend, meetingNo: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-96">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="meetingDate">
                      Meeting Date
                    </label>
                    <input
                      id="meetingDate"
                      name="meetingDate"
                      className="form-input w-full"
                      type="date"
                      defaultValue={dataSend.meetingDate}
                      // defaultValue={formatDateForInput(dataEdit.meetingDate)}
                      // defaultValue={
                      //   dataEdit?.meetingDate
                      //     ? formatDateForInput(dataSend.meetingDate)
                      //     : ""
                      // }
                      onChange={(e) =>
                        setDataSend(
                          removeDashesFromDate({
                            ...dataSend,
                            meetingDate: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              {/* ROW 3 */}
              <div className="mb-5 ml-0 mr-0">
                <div className="ml-0">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="topic">
                      Topic
                    </label>
                    <div className="relative">
                      <input
                        id="topic"
                        name="topic"
                        className="form-input w-full"
                        placeholder="Input any Topic"
                        type="text"
                        defaultValue={dataSend.topic}
                        onChange={(e) =>
                          setDataSend({ ...dataSend, topic: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* ROW 4 */}
              <div className="flex mb-5 justify-center">
                <div className="mr-4">
                  <div className="w-96">
                    <PicInternalDropdown
                      placeholder="Select PIC Internal"
                      label="PIC Internal"
                      defaultValue={dataSend.picInternal}
                      onSelect={(value) =>
                        setDataSend({
                          ...dataSend,
                          picInternal: value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-96">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="picExternal">
                      PIC External
                    </label>
                    <input
                      id="picExternal"
                      name="picExternal"
                      className="form-input w-full"
                      placeholder="Input any PIC External"
                      type="text"
                      defaultValue={dataSend.picExternal}
                      onChange={(e) =>
                        setDataSend({
                          ...dataSend,
                          picExternal: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* ROW 5 */}
              <div className="mb-5 ml-0 mr-0">
                <div className="ml-0">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="tags">
                      Tags
                    </label>
                    <div className="relative">
                      <input
                        id="tags"
                        name="tags"
                        className="form-input w-full"
                        placeholder="Input any Tags"
                        type="text"
                        defaultValue={dataSend.tags}
                        onChange={(e) =>
                          setDataSend({ ...dataSend, tags: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* ROW 6 */}
              <div className="mb-10 ml-0 mr-0">
                <div className="ml-0">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address">
                      Remark
                    </label>
                    <div className="relative">
                      <textarea
                        id="remark"
                        name="remark"
                        className="form-input w-full"
                        placeholder="Input Remarks"
                        defaultValue={dataSend.remark}
                        onChange={(e) =>
                          setDataSend({ ...dataSend, remark: e.target.value })
                        }
                        rows={4}
                        cols={50}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* BUTTON */}
              <div className="flex mb-6 justify-begin">
                <div className="ml-0">
                  <div className="mt-0">
                    <div className="flex flex-wrap items-center -m-1.5">
                      <div className="m-1.5">
                        <Button
                          type="tertiary"
                          iconName={faRightFromBracket}
                          text="Cancel"
                          onClick={() => closeModal()}
                        />
                      </div>
                      <div className="m-1.5">
                        <Button
                          type="primary"
                          iconName={faCheckToSlot}
                          text="Save"
                          onClick={SaveEdit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalCustom>
    </div>
  );
}

export default MomEdit;
