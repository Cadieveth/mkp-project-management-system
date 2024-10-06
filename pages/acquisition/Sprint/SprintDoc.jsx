import React, { useEffect, useState } from "react";
import ModalBasic from "../../../components/ModalBasic";
import Button from "../../../components/Button";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import CustomVerticalTable from "../../../components/CustomVerticalTable";
import config from "../../../../config";
import SprintModalImage from "./SprintModalImage";
import ModalCustom from "../../../components/ModalCustom";

export default function SprintDoc({ modalOpen, setModalOpen, data }) {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [openModalImage, setOpenModalImage] = useState(false);
  const [idForImage, setIdForImage] = useState(0);

  const setNotif = (type, message) => {
    // Implement your notification logic here
    console.log(`${type}: ${message}`);
  };

  const getDownload = async (fileName) => {
    try {
      const response = await fetch(
        `${config.api_ptms}/download-file?fileName=${fileName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );

      if (!response.ok) {
        setNotif("error", `Failed to download file: ${response.statusText}`);
        return;
      }

      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setNotif("success", "File downloaded successfully");
    } catch (error) {
      setError(error);
      setNotif("error", `Error downloading file: ${error.message}`);
    }
  };

  const handleCheck = () => {
    console.log("CEK DATA: ", data.id);
    console.log(`${config.api_ptms}/sprint/document/list?id=${data.id}`);
  };

  const getDocList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/document/list?id=${data.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const responseAPI = await response.json();
      if (response.ok) {
        setList(responseAPI.result);
        console.log("API Response:", responseAPI.result);
      } else {
        setNotif("warning", responseAPI.meta.message);
      }
    } catch (error) {
      setError(error);
      setNotif("error", `Error fetching document list: ${error.message}`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const tableData = [
    { header: "KTP PIC", value: list.length > 0 ? list[0].ktpPic : "" },
    {
      header: "KTP Directors",
      value: list.length > 0 ? list[0].ktpDirectors : "",
    },
    {
      header: "NPWP Directors",
      value: list.length > 0 ? list[0].npwpDirectors : "",
    },
    { header: "NPWP Office", value: list.length > 0 ? list[0].npwpOffice : "" },
    { header: "Akta Office", value: list.length > 0 ? list[0].aktaOffice : "" },
    {
      header: "Akta Amendmend",
      value: list.length > 0 ? list[0].aktaAmantmend : "",
    },
    { header: "SK Kemenkeh", value: list.length > 0 ? list[0].skKemenkeh : "" },
    { header: "NIB", value: list.length > 0 ? list[0].nib : "" },
    { header: "SIUP", value: list.length > 0 ? list[0].siup : "" },
    {
      header: "Photo Office",
      value: list.length > 0 ? list[0].photoOffice : "",
    },
  ];

  const isAllDataEmpty =
    list.length > 0 &&
    list[0].ktpPic === "" &&
    list[0].ktpDirectors === "" &&
    list[0].npwpDirectors === "" &&
    list[0].npwpOffice === "" &&
    list[0].aktaOffice === "" &&
    list[0].aktaAmantmend === "" &&
    list[0].skKemenkeh === "" &&
    list[0].nib === "" &&
    list[0].siup === "" &&
    list[0].photoOffice === "";

  useEffect(() => {
    if (data && data.id) {
      getDocList();
    }
  }, [data]);

  return (
    <div>
      <ModalCustom
        id="feedback-modal"
        modalOpen={modalOpen}
        setModalOpen={closeModal}
        title={`Document Sprint ${data?.sprintCode || ""}`}
        type="lg">
        <div className="px-5">
          <div className="mt-4">
            <CustomVerticalTable
              data={tableData.map((item) => ({
                ...item,
                iconVisible: item.value !== "" && item.value !== null,
              }))}
              downloadClick={(fileName) => getDownload(fileName)}
            />
          </div>
          <div className="flex justify-end mt-5 mb-1">
            <div className={isAllDataEmpty ? "hidden" : "mr-2 mb-5"}>
              <Button
                type="primary"
                iconName={faEye}
                text="Show All"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModalImage(true);
                  setIdForImage(data.id);
                  console.log("Button di klik, status: ", openModalImage);
                }}
              />
            </div>
            <div className="mr-2 hidden">
              <Button
                type="tertiary"
                iconName={faCheck}
                text="check"
                onClick={handleCheck}
              />
            </div>
            <div className="hidden">
              <Button
                type="primary"
                iconName={faCheck}
                text="OK"
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
      </ModalCustom>
      <SprintModalImage
        modalOpen={openModalImage}
        setModalOpen={setOpenModalImage}
        sprintId={idForImage}
      />
    </div>
  );
}
