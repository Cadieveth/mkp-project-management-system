import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import { faPlus, faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../components/Button";
import config from "../../../../config";
import CustomTable from "../../../components/CustomTable";
import { Menu, MenuItem, MenuList } from "@mui/material";
import DropdownDataPage from "../../../components/DropdownDataPage";
import ListItemGlobal from "../../../components/ListItemGlobal";
import moment from "moment/moment";
import SurveyDelValidation from "./SurveyDelValidation";
import { Check } from "@material-ui/icons";
import { handleTokenExpired } from "../../../utils/Utils";

export default function SurveyTable() {
  const [list, setList] = useState([]);
  const {
    surveyPack,
    setLoadingState,
    setNotif,
    statusIsEditing,
    setNewDataEdit,
  } = useStateContext();
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataMenu, setDataMenu] = useState({});
  const [dataCount, setDataCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const tableData = list;

  const getSurveyList = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/survey/list?sprintId=${surveyPack.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (surveyPack.id === undefined || surveyPack.id === null) {
          navigate("/sprint");
        }
        setList(data.result);
        setDataCount(data.result.length);
        if (data.result.length === 0) {
          setNotif("warning", "No Available Data");
        } else {
          if (response.status === 401) {
            handleTokenExpired();
          } else {
            setNotif("warning", data.meta.message);
          }
        }
      } else {
        setNotif("warning", "No Available Data");
      }
    } catch (error) {
      console.error(error);
      if (error.name === "TypeError" && error.message.includes("null")) {
        setNotif("warning", "No Available Data");
      } else {
        setNotif("error", error.message);
      }
    } finally {
      setLoadingState(false);
    }
  };

  const handleClick = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDataMenu({});
  };

  const tableHeaders = [
    {
      title: "Action",
      value: "action",
      hidden: false,
      align: "left",
      width: "50px",
    },
    {
      title: "Doc No",
      value: "docNo",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Doc Date",
      value: "docDate",
      hidden: false,
      align: "left",
      width: "120px",
    },
    {
      title: "Survey Date",
      value: "surveyDate",
      hidden: false,
      align: "left",
      width: "130px",
    },
    {
      title: "Merchant",
      value: "merchantName",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "PIC Survey",
      value: "picSurvey",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Client Needs",
      value: "clientNeeds",
      hidden: false,
      align: "left",
      width: "300px",
    },
    {
      title: "Solutions",
      value: "solution",
      hidden: false,
      align: "left",
      width: "300px",
    },

    {
      title: "Tags",
      value: "tags",
      hidden: false,
      align: "left",
      width: "300px",
    },
  ];

  const renderCell = (item, header) => {
    const formatedDate = ["docDate", "surveyDate"];
    if (header.value === "action") {
      return (
        <div className="space-x-1 ml-2">
          <Button
            type="icon"
            iconName={faBars}
            onClick={(event) => handleClick(event, item)}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              style: {
                border: "1px solid #e4ecf4",
              },
            }}>
            <MenuList sx={{ width: 150 }}>
              {/* MENU 1 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  statusIsEditing(true);
                  setNewDataEdit(dataMenu);
                  navigate("/sprint/Survey-Form");
                  handleClose();
                }}>
                <ListItemGlobal type={"edit"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 2 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setDataDelete(dataMenu.id);
                  setValidDelModalOpen(true);
                  handleClose();
                }}>
                <ListItemGlobal type={"delete"} dataMenu={dataMenu} />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      );
    } else if (formatedDate.includes(header.value)) {
      const formattedDate = moment(item[header.value]).format("DD MMM YYYY");
      return (
        <span> {formattedDate == "Invalid date" ? "-" : formattedDate} </span>
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    getSurveyList();
  }, []);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl md:text-2xl text-slate-800 font-bold">
            Survey
          </div>
          <div className="text-sm"> Sprint {surveyPack.sprintCode}</div>
        </div>
        <div className="flex justify-center">
          <Button
            type="bigIcon"
            iconName={faXmark}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/sprint");
            }}
            iconSize="text-xl"
            titleTooltip="Back"
          />
        </div>
      </div>
      <div className="flex justify-end mb-5">
        <div className="mt-8">
          <Button
            type="primary"
            iconName={faPlus}
            text="Add Data"
            onClick={(e) => {
              e.stopPropagation();
              if (dataCount > 0) {
                setNotif("warning", "Unable to add additional data.");
              } else {
                statusIsEditing(false);
                navigate("/sprint/Survey-Form");
              }
            }}
          />
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
        <div>
          <div className="overflow-x-auto overflow-y-auto">
            <CustomTable
              headers={tableHeaders}
              items={tableData}
              renderCell={renderCell}
              checkBox={false}
            />
          </div>
        </div>
      </div>
      {/* BUAT KOMPONEN */}
      <SurveyDelValidation
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        getDataList={getSurveyList}
        apiUrl={`${config.api_ptms}/survey/remove/${dataDelete}`}
      />
    </div>
  );
}
