import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../ContextProvider";
import {
  faCircleCheck,
  faCopy,
  faLink,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";

export default function SprintModal({ modalOpen, setModalOpen, data }) {
  const [link, setLink] = useState("");
  const { setNotif } = useStateContext();
  const [cpEmail, setCpEmail] = useState("");

  const handleClick = () => {
    copyText(link);
  };

  const handleCheck = () => {
    console.log("Ini data dari Sprint: ", data);
    console.log("Ini data email fetch: ", cpEmail);
    console.log("Cek data ID: ", data.id);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCpEmail("");
  };

  const copyText = (text) => {
    try {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = text;
      tempTextArea.style.position = "absolute";
      tempTextArea.style.left = "-9999px";
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      tempTextArea.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);
      setNotif("success", "Copied to Clipboard");
    } catch (err) {
      setNotif("warning", "Failed to copy to Clipboard");
    }
  };

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/detail/${data.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const responseAPI = await response.json();
      if (response.ok) {
        const cpEmailValue = responseAPI.result.merchantCp.cpEmail;
        if (cpEmailValue.trim() === "") {
          // Jika cpEmail kosong, tampilkan notifikasi
          setNotif(
            "warning",
            "No data available, please insert an email address"
          );
          console.log("INI JALAN");
        } else {
          setCpEmail(cpEmailValue);
        }
      } else {
        console.log("Gagal: ", responseAPI.meta.message);
        setNotif("warning", responseAPI.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("Error ", error.message);
    }
  };

  const sendEmail = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const dataBody = {
        id: data.id,
        emailTo: cpEmail,
        link: link,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/send-email/link-confirm-letter-merchant`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(dataBody),
        }
      );
      const responseAPI = await response.json();
      if (response.ok) {
        console.log(responseAPI.meta.message);
        setNotif(
          "success",
          `The link has been successfully sent to ${cpEmail}`
        );
        closeModal();
      } else {
        console.log(responseAPI.meta.message);
        setNotif(
          "warning",
          "Link failed to be sent. Please check the Email Address!"
        );
      }
    } catch (error) {
      console.error("Error: ", error);
      setNotif("error", error.message);
    }
  };

  const handleClickMicrosite = () => {
    const url = `${config.microset_sprint_com}/sprint/${encryptedId}`;
    window.open(url, "_blank");
    closeModal();
  };

  const encryptedId = btoa(data.id);

  useEffect(() => {
    setLink(`${config.microset_sprint_com}/sprint/${encryptedId}`);
  }, [data]);

  useEffect(() => {
    if (modalOpen) {
      fetchData();
    }
  }, [modalOpen]);

  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={`LINK SPRINT ${data.sprintCode}`}
      type="lg">
      <div className="px-5 py-0">
        <div className="mt-2">
          <TextFieldGlobal
            id="myInput" // Set the ID here
            label="Link"
            value={link}
            type="filled"
            readOnly={true}
          />
        </div>
        <div className="mt-2">
          <TextFieldGlobal
            label="Email"
            value={cpEmail}
            type="filled"
            onChange={(e) => setCpEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-5 mb-5">
          <div>
            <Button
              type="tertiary"
              iconName={faCopy}
              text="Copy"
              onClick={handleClick}
            />
          </div>
          <div>
            <Button
              type="primary"
              iconName={faPaperPlane}
              text="Sent"
              onClick={sendEmail}
            />
          </div>
          <div>
            <Button
              type="primary"
              iconName={faLink}
              text="Follow Link"
              onClick={handleClickMicrosite}
            />
          </div>
        </div>
      </div>
    </ModalBasic>
  );
}
