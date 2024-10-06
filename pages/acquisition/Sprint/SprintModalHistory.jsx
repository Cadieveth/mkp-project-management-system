import React, { useEffect, useState } from "react";
import ModalBasic from "../../../components/ModalBasic";
import config from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import { useStateContext } from "../../../ContextProvider";
import CustomTable from "../../../components/CustomTable";
import BadgeGlobal from "../../../components/BadgeGlobal";
import moment from "moment/moment";

export default function SprintModalHistory({
  modalOpen,
  setModalOpen,
  dataSprint,
}) {
  const [list, setList] = useState([]);
  const { setNotif } = useStateContext();
  const tableData = list;

  useEffect(() => {
    const getHistoryList = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(
          `${config.api_ptms}/sprint/history-doc/list?id=${dataSprint.id}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const data = await response.json();
        if (response.ok) {
          setList(data.result);
          setNotif("success", data.meta.message);
        } else {
          setNotif("warning", data.meta.message);
        }
      } catch (error) {
        console.error(error);
        setNotif("error", error.message);
      }
    };

    if (modalOpen) {
      getHistoryList();
    }
  }, [modalOpen, dataSprint]);

  const formatCreatedAt = (createdAt) => {
    if (!createdAt) return "-";
    const slicedDate = createdAt.slice(0, 8);
    const formattedDate = moment(slicedDate, "YYYYMMDD").format("DD MMM YYYY");
    return formattedDate;
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCheck = () => {
    console.log("Data Sprint: ", dataSprint);
    console.log("Ini data API: ", list);
  };

  const tableHeaders = [
    {
      title: "Activity",
      value: "activity",
      hidden: false,
      align: "left",
      width: "50px",
    },
    {
      title: "Reason",
      value: "remark",
      hidden: false,
      align: "left",
      width: "500px",
    },
    {
      title: "By",
      value: "by",
      hidden: false,
      align: "left",
      width: "100px",
    },
  ];

  const renderCell = (item, header) => {
    if (header.value === "activity") {
      return (
        <BadgeGlobal
          color={
            item[header.value] === "CONFIRMED"
              ? "emerald"
              : item[header.value] === "UPDATE"
              ? "yellow"
              : item[header.value] === "CREATE"
              ? "blue"
              : "rose"
          }
          text={
            item[header.value] === "CONFIRMED"
              ? "CONFIRMED"
              : item[header.value] === "UPDATE"
              ? "UPDATE"
              : item[header.value] === "CREATE"
              ? "CREATE"
              : "CHANGE REQUEST"
          }
        />
      );
    } else if (header.value === "by") {
      return (
        <div>
          <span className="font-bold text-sm">
            {item.createUsername ? item.createUsername : "-"}
          </span>
          <br />
          <span className="font-light text-xs">
            {item.createAt
              ? moment(item.createAt, "YYYYMMDDHHmmss").format(
                  "DD MMM YYYY HH:mm"
                )
              : "-"}
          </span>
        </div>
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  return (
    <ModalBasic
      id="sprintHistory-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={`History Document ${dataSprint.sprintCode}`}
      type="5xl">
      <div>
        <div id="content" className="p-5">
          <div>
            <CustomTable
              headers={tableHeaders}
              items={tableData}
              renderCell={renderCell}
              checkBox={false}
              height={30}
            />
          </div>
        </div>
        <div id="button-row" className="flex justify-end mb-5 mr-5 hidden">
          <Button
            type="primary"
            iconName={faCheck}
            text="Ok"
            onClick={(e) => {
              e.stopPropagation();
              handleCheck();
              //   setModalOpen(false);
            }}
          />
        </div>
      </div>
    </ModalBasic>
  );
}
