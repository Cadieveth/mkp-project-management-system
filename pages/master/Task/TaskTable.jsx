import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  faPlus,
  faFilter,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem, MenuList } from "@mui/material";
import config from "../../../../config";
import PaginationGlobal from "../../../components/PaginationGlobal";
import CustomTable from "../../../components/CustomTable";
import BadgeGlobal from "../../../components/BadgeGlobal";
import ListItemGlobal from "../../../components/ListItemGlobal";
import DropdownDataPage from "../../../components/DropdownDataPage";
import KeywordForm from "../../../components/KeywordForm";
import TaskModal from "./TaskModal";
import DropdownStatus from "../../../components/DropdownStatus";
import Button from "../../../components/Button";
import { handleTokenExpired } from "../../../utils/Utils";
import TaskValidation from "./TaskValidation";

function TaskTable() {
  const { dataTask } = useStateContext();
  const [list, setList] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataResult, setDataResult] = useState({});
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [dataDelete, setDataDelete] = useState({});
  const [dataEdit, setDataEdit] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const navigate = useNavigate();
  const { setLoadingState, setNotif } = useStateContext();
  const tableData = list;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dataMenu, setDataMenu] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [validModalOpen, setValidModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const getTaskList = async (page, status = "") => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `${config.api_master}/task/list?divisionId=${
          dataTask.id
        }&keyword=${keyword}&status=${
          status == "All" ? "" : status
        }&limit=${itemsPerPage}&offset=${offset}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        if (dataTask.id === undefined || dataTask.id === null) {
          navigate("/division");
        }
        setList(data.result);
        setNotif("success", data.meta.message);
        handleClose();
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

  const getTaskCount = async (page, status = "") => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/task/count-list?divisionId=${
          dataTask.id
        }&keyword=${keyword}&status=${status == "All" ? "" : status}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        setTotalData(data.result);
      } else {
        console.log("Gagal mengambil data Count");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/task/remove/${dataDelete}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(
          `Data with ID ${dataDelete} has been deleted successfully.`
        );
        getTaskList(currentPage, status, keyword);
        getTaskCount(currentPage, status, keyword);
        backToPage1();
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const editStatusTask = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/task/edit-active/${dataEdit}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        getTaskList(currentPage, status, keyword);
        getTaskCount(currentPage, status, keyword);
        backToPage1();
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const applyFilter = (type) => {
    const encodedStatus = encodeURIComponent(status);
    setCurrentPage(1);
    getTaskList(1, encodedStatus);
    getTaskCount(1, encodedStatus);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const resetFilters = () => {
    setKeyword("");
    setStatus("");
  };

  const backToPage1 = () => {
    setCurrentPage(1);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
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
      width: "100px",
    },
    {
      title: "Task Code",
      value: "taskCode",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "Task Name",
      value: "taskName",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "Description",
      value: "description",
      hidden: false,
      align: "left",
      width: "350px",
    },
    {
      title: "Status",
      value: "status",
      hidden: false,
      align: "center",
      width: "100px",
    },
  ];

  const renderCell = (item, header) => {
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
            }}>
            <MenuList sx={{ width: 150 }}>
              {/* MENU 1 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (dataMenu.active === "Y") {
                    setDataResult(dataMenu);
                    setIsEditing(true);
                    setEditModalOpen(true);
                    handleClose();
                  }
                }}
                disabled={dataMenu.active === "N"}>
                <ListItemGlobal type={"edit"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 2 */}
              <MenuItem
                onClick={(e) => {
                  setDataEdit(dataMenu.id);
                  setValidModalOpen(true);
                  setIsDelete(false);
                  e.stopPropagation();
                  handleClose();
                }}
                title={
                  dataMenu.active === "Y"
                    ? "Click to Inactivate"
                    : "Click to Activate"
                }>
                <ListItemGlobal type={"editActive"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 3 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.active === "Y") {
                    setDataDelete(dataMenu.id);
                    setValidModalOpen(true);
                    setIsDelete(true);
                    handleClose();
                  }
                }}
                disabled={dataMenu.active === "N"}>
                <ListItemGlobal type={"delete"} dataMenu={dataMenu} />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      );
    } else if (header.value === "status") {
      return (
        <BadgeGlobal
          color={item.active === "Y" ? "emerald" : "rose"}
          text={item.active === "Y" ? "ACTIVATED" : "INACTIVATED"}
        />
      );
    } else if (header.value === "description") {
      const description = item[header.value] || "-";
      const descriptionLines = description.split("\n");

      const isScrollable = descriptionLines.length > 3;

      return (
        <div
          style={{
            maxHeight: isScrollable ? "100px" : "auto",
            overflowY: isScrollable ? "auto" : "visible",
          }}>
          {descriptionLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    getTaskList(currentPage, status, keyword);
    getTaskCount(currentPage, status, keyword);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl md:text-2xl text-slate-800 font-bold">
            Task
          </div>
          <div className="text-sm">{dataTask.divisionName}</div>
        </div>
        <div className="flex justify-center">
          <Button
            type="bigIcon"
            iconName={faXmark}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/division");
            }}
            iconSize="text-xl"
            titleTooltip="Back"
          />
        </div>
      </div>
      <div className="row mb-5">
        <div className="flex justify-between">
          <div className="mr-2 w-1/2">
            <KeywordForm keyword={keyword} onChange={handleKeywordChange} />
          </div>
          <div className="w-1/2 ml-2">
            <div className="w-full">
              <DropdownStatus status={status} onChange={handleStatusChange} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-0">
          <div className="flex flex-wrap items-center -m-1.5">
            <div className="m-1.5">
              <Button
                type="primary"
                iconName={faFilter}
                text="Filter"
                onClick={() => {
                  applyFilter();
                }}
              />
            </div>
          </div>
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
              resetFilters();
              setIsEditing(false);
              setAddModalOpen(true);
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
      <TaskModal
        isEditing={isEditing}
        modalOpen={isEditing ? editModalOpen : addModalOpen}
        setModalOpen={isEditing ? setEditModalOpen : setAddModalOpen}
        dataResult={dataResult}
        getDataList={getTaskList}
        getDataCount={getTaskCount}
        setCurrentPage={currentPage}
        setKeyword={keyword}
        setStatus={status}
        toPage1={backToPage1}
        config={config}
      />
      <TaskValidation
        modalOpen={validModalOpen}
        setModalOpen={setValidModalOpen}
        isDelete={isDelete}
        deleteData={deleteTask}
        editData={editStatusTask}
      />
    </div>
  );
}

export default TaskTable;
