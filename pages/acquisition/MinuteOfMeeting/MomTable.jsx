import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import { faPlus, faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../components/Button";
import config from "../../../../config";
import CustomTable from "../../../components/CustomTable";
import { Menu, MenuList, MenuItem } from "@mui/material";
import DropdownDataPage from "../../../components/DropdownDataPage";
import ListItemGlobal from "../../../components/ListItemGlobal";
import PaginationGlobal from "../../../components/PaginationGlobal";
import moment from "moment/moment";
import ValidDelete from "../../../components/ValidDelete";
import { handleTokenExpired } from "../../../utils/Utils";

export default function MomTable() {
  const [list, setList] = useState([]);
  const { momPack, setLoadingState, setNotif, statusIsEditing, setNewDataMom } =
    useStateContext();
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [totalData, setTotalData] = useState(0);
  const [dataMenu, setDataMenu] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const tableData = list;

  const getMomList = async (page, status) => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `${config.api_ptms}/mom/list?sprintId=${momPack.id}&keyword&limit=${itemsPerPage}&offset=${offset}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (momPack.id === undefined || momPack.id === null) {
          navigate("/sprint");
        }
        setList(data.result);
        setNotif("success", data.meta.message);
      } else {
        if (response.status === 401) {
          handleTokenExpired();
        } else {
          setNotif("warning", data.meta.message);
        }
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const getMomCount = async (page, status = "") => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/mom/count-list?sprintId=${momPack.id}&keyword`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTotalData(data.result);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
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

  const backToPage1 = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
      title: "Meeting No",
      value: "meetingNo",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Meeting Date",
      value: "meetingDate",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Topic",
      value: "topic",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "PIC Internal",
      value: "picInternal",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "PIC External",
      value: "picExternal",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "tags",
      value: "tags",
      hidden: false,
      align: "left",
      width: "150px",
    },
  ];

  const renderCell = (item, header) => {
    const formatedDate = ["meetingDate"];
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
                  setNewDataMom(dataMenu);
                  navigate("/sprint/Minute-of-meeting/Form");
                  handleClose();
                }}>
                <ListItemGlobal type={"edit"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 2 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setValidDelModalOpen(true);
                  setDataDelete(dataMenu.id);
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
    getMomList(currentPage);
    getMomCount(currentPage);
    console.log("Ini Data MomPack: ", momPack);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl md:text-2xl text-slate-800 font-bold">
            Minute of Meeting
          </div>
          <div className="text-sm"> Sprint {momPack.sprintCode}</div>
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
      <div className="flex justify-between mb-5">
        <div className="ml-3 flex">
          <DropdownDataPage
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            toPage1={backToPage1}
            onChange={(item) => setItemsPerPage(item)}
          />
        </div>
        <div className="mt-8">
          <Button
            type="primary"
            iconName={faPlus}
            text="Add Data"
            onClick={(e) => {
              e.stopPropagation();
              statusIsEditing(false);
              navigate("/sprint/Minute-of-meeting/Form");
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
      <div className="px-6 py-8">
        <PaginationGlobal
          totalItems={totalData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <ValidDelete
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        dataDelete={dataDelete}
        getDataList={getMomList}
        getDataCount={getMomCount}
        setCurrentPage={currentPage}
        toPage1={backToPage1}
        setData={momPack}
        apiUrl={`${config.api_ptms}/mom/remove/${dataDelete}`}
      />
    </div>
  );
}
