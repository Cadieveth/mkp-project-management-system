import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  faBan,
  faCircleCheck,
  faCheck,
  faFloppyDisk,
  faArrowLeft,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import { useStateContext } from "../../../ContextProvider";

import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import Button from "../../../components/Button";
import config from "../../../../config";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import DatePickerNew from "../../../components/DatePickerNew";

import PicInternalDropdown from "../../master/Partner/PicInternalDropdown";
import ModalReason from "../../../components/ModalReason";
import ValidDelete from "../../../components/ValidDelete";

import JoditEditor from "jodit-react";
import WysiwygGlobal from "../../../components/WysiwygGlobal";
import { handleTokenExpired } from "../../../utils/Utils";

export default function MomForm({ placeholder }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    dataSprint,
    setLoadingState,
    setNotif,
    isEditing,
    setNewDivisionId,
    momPack,
    dataMom,
  } = useStateContext();
  const navigate = useNavigate();

  const [id, setId] = useState(-99);
  const [sprint, sprintId] = useState(-99);
  const [meetingNo, setMeetingNo] = useState("");
  const [meetingDate, setMeetingDate] = useState(
    moment().format("DD MMM YYYY")
  );
  const [topic, setTopic] = useState("");
  const baseMom = {
    picInternal: { label: "", value: "" },
  };
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [picInternal, setPicInternal] = useState(baseMom);
  const [picExternal, setPicExternal] = useState("");
  const [remark, setRemark] = useState("");
  const [tags, setTags] = useState("");
  // const editor = useRef(null);

  async function saveAdd(reason) {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        sprintId: momPack.id,
        meetingNo,
        meetingDate: moment(meetingDate).format("YYYYMMDD"),
        topic,
        picInternal: picInternal.picInternal.value,
        picExternal,
        remark,
        tags,
        reason,
      };
      const response = await fetch(`${config.api_ptms}/mom/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      if (response.ok) {
        closePage();
        setNotif("success", responseJSON.meta.message);
        setReasonModalOpen(true);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", responseData.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  }

  async function saveEdit(reason) {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const data = {
        id: dataMom.id,
        sprintId: dataMom.sprintId,
        meetingNo: meetingNo,
        meetingDate: moment(meetingDate).format("YYYYMMDD"),
        topic: topic,
        picInternal: picInternal.picInternal.value,
        picExternal: picExternal,
        remark: remark,
        tags: tags,
        reason: reason,
      };
      const response = await fetch(`${config.api_ptms}/mom/edit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        closePage();
        setNotif("success", responseData.meta.message);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", responseData.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  }

  const closePage = () => {
    navigate("/sprint/Minute-of-meeting");
    setMeetingNo("");
    setMeetingDate("");
    setTopic("");
    setPicInternal("");
    setPicExternal("");
    setTags("");
    setRemark("");
  };

  // const config = useMemo(
  //   {
  //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //     placeholder: placeholder || "Start typings...",
  //   },
  //   [placeholder]
  // );

  // const config = useMemo(
  //   () => ({
  //     readonly: false,
  //     placeholder: placeholder || "Start typing...",
  //   }),
  //   [placeholder]
  // );

  useEffect(() => {
    console.log("Response dataMom: ", dataMom);
    console.log("Response momPack: ", momPack);
    console.log("isEditing? ", isEditing);
    if (isEditing) {
      if (momPack) {
        setMeetingNo(dataMom.meetingNo);
        setMeetingDate(
          dataMom.meetingDate === "-"
            ? moment().format("DD MMM YYYY")
            : moment(dataMom.meetingDate).format("DD MMM YYYY")
        );
        setTopic(dataMom.topic);
        setPicInternal({
          picInternal: {
            label:
              momPack.picCommercialCode + "  -  " + momPack.picCommercialName,
            value: dataMom.picInternal,
          },
        });
        setPicExternal(dataMom.picExternal);
        setTags(dataMom.tags);
        setRemark(dataMom.remark);
      }
    } else {
      setMeetingNo("");
      setMeetingDate(moment().format("DD MMM YYYY"));
      setTopic("");
      setPicInternal({
        picInternal: {
          label: "",
          value: "",
        },
      });
      setPicExternal("");
      setTags("");
      setRemark("");
    }
  }, [momPack]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            <div className="flex justify-center items-center min-top-screen mb-10">
              <div className="w-full">
                <div className="bg-white shadow-lg rounded overflow-hidden border border-slate-200 rounded-2xl">
                  <div className="px-6 py-4">
                    {/* BUTTON TOP */}
                    <div className="flex mb-6 mt-2 justify-between">
                      <div>
                        <div className="text-2xl md:text-2xl text-slate-800 font-bold">
                          {isEditing
                            ? "Edit Minute of Meeting"
                            : "Add Minute of Meeting"}
                        </div>
                        <div className="text-sm">
                          Sprint {momPack.sprintCode}
                        </div>
                      </div>
                      <div className="ml-2">
                        <div className="mt-0">
                          <div className="flex flex-wrap items-center -m-1.5">
                            <div className="m-1.5">
                              <Button
                                type="tertiary"
                                iconName={faArrowLeft}
                                text="Back"
                                onClick={closePage}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={isEditing ? faCheck : faFloppyDisk}
                                text={isEditing ? "Update" : "Save"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReasonModalOpen(true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ROW 2 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8 mt-0.5">
                        <TextFieldGlobal
                          label="Meeting No"
                          value={meetingNo}
                          onChange={(e) => setMeetingNo(e.target.value)}
                          helperText="If left blank, the Meeting Number will be automatically generated by the system."
                        />
                      </div>
                      <div className="w-1/2 -mt-2">
                        <DatePickerNew
                          label="Meeting Date"
                          value={meetingDate}
                          onChange={(value) => setMeetingDate(value)}
                        />
                      </div>
                    </div>
                    {/* ROW 3 */}
                    <div className="px-8 mt-1">
                      <div className="w-full">
                        <TextFieldGlobal
                          label="Topic"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          multiline={true}
                          rows={1}
                        />
                      </div>
                    </div>
                    {/* ROW 4 */}
                    <div className="flex justify-between px-8 mt-1">
                      <div className="w-1/2 mr-8">
                        <PicInternalDropdown
                          value={picInternal.picInternal}
                          onChange={(event, value) => {
                            setPicInternal({
                              ...picInternal,
                              picInternal: value ?? {
                                label: "-",
                                value: "",
                              },
                            });
                          }}
                        />
                      </div>
                      <div className="w-1/2">
                        <TextFieldGlobal
                          label="PIC External"
                          value={picExternal}
                          onChange={(e) => setPicExternal(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* ROW 5 */}
                    <div className="px-8 mt-1">
                      <div className="w-full">
                        <TextFieldGlobal
                          label="Tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          multiline={true}
                          rows={3}
                        />
                      </div>
                    </div>
                    {/* ROW 6 REMARK */}
                    <div className="px-8 mt-1">
                      <div className="w-full">
                        {/* <TextFieldGlobal
                          label="Remark"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          multiline={true}
                          rows={3}
                        /> */}
                        {/* <JoditEditor
                          ref={editor}
                          value={remark}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setRemark(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {}}
                        /> */}
                        <WysiwygGlobal
                          item={remark}
                          setItem={setRemark}
                          readOnly={false}
                          placeholder="Start Typing..."
                          label="Remark"
                        />
                      </div>
                    </div>
                    {/* BUTTON BOTTOM */}
                    <div className="flex mb-2 ml-12 mt-5 justify-end">
                      <div className="ml-2">
                        <div className="mt-0">
                          <div className="flex flex-wrap items-center -m-1.5">
                            <div className="m-1.5">
                              <Button
                                type="tertiary"
                                iconName={faArrowLeft}
                                text="Back"
                                onClick={closePage}
                              />
                            </div>
                            <div className="m-1.5">
                              <Button
                                type="primary"
                                iconName={isEditing ? faCheck : faFloppyDisk}
                                text={isEditing ? "Update" : "Save"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReasonModalOpen(true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ModalReason
        modalOpen={reasonModalOpen}
        setModalOpen={setReasonModalOpen}
        saveAdd={saveAdd}
        saveEdit={saveEdit}
        isEditing={isEditing}
      />
    </div>
  );
}
