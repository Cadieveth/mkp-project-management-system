import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faSquareMinus,
  faFloppyDisk,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../../ContextProvider";
import { handleTokenExpired } from "../../../utils/Utils";
import { Menu, MenuItem, MenuList } from "@mui/material";
import config from "../../../../config";
import Button from "../../../components/Button";
import PaginationGlobal from "../../../components/PaginationGlobal";
import CustomTable from "../../../components/CustomTable";
import BadgeGlobal from "../../../components/BadgeGlobal";
import ListItemGlobal from "../../../components/ListItemGlobal";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import DropdownDataPage from "../../../components/DropdownDataPage";
import HardwareValidation from "./HardwareValidation";

export default function HardwarePackageTable() {
  const navigate = useNavigate();
  const { hardwarePack, setLoadingState, setNotif } = useStateContext();
  const [list, setList] = useState([]);
  const [dataMenu, setDataMenu] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [validModalOpen, setValidModalOpen] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [deletedId, setDeletedId] = useState(0);
  const [editedId, setEditedId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [hardwareSpek, setHardwareSpek] = useState("");
  const [hardwareName, setHardwareName] = useState("");
  const [editingData, setEditingData] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const tableData = list;

  const getHardwareList = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/hardware/list?projectCtgrId=${
          hardwarePack.id
        }&limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (hardwarePack === undefined || hardwarePack === null) {
          navigate("/package-category");
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
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const getHardwareCount = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/hardware/count-list?projectCtgrId=${hardwarePack.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTotalData(data.result);
        console.log(data.meta.message);
      } else {
        console.log(data.meta.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addHardware = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const newData = {
        projectCtgrId: hardwarePack.id,
        hardwareName: hardwareName,
        spek: hardwareSpek,
      };
      const response = await fetch(`${config.api_master}/hardware/add`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      if (response.ok) {
        backToPage1();
        getHardwareList(currentPage);
        getHardwareCount(currentPage);
        setHardwareName("");
        setHardwareSpek("");
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const editHardware = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const editedData = {
        id: editingData.id,
        projectCtgrId: editingData.projectCtgrId,
        hardwareName: hardwareName,
        spek: hardwareSpek,
      };
      const response = await fetch(`${config.api_master}/hardware/edit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(editedData),
      });
      const data = await response.json();
      if (response.ok) {
        backToPage1();
        getHardwareList(currentPage);
        getHardwareCount(currentPage);
        setHardwareName("");
        setHardwareSpek("");
        setIsEditing(false);
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  const deleteHardware = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/hardware/remove/${deletedId}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        getHardwareList(currentPage);
        getHardwareCount(currentPage);
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

  const editStatusHardware = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/hardware/edit-active/${editedId}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        getHardwareList(currentPage);
        getHardwareCount(currentPage);
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

  const resetPage = () => {
    backToPage1();
    setHardwareName("");
    setHardwareSpek("");
    setIsEditing(false);
    setIsDelete(false);
    setIsReset(true);
  };

  const handleClick = () => {
    if (isEditing) {
      editHardware();
    } else {
      addHardware();
    }
  };

  const handleCheck = () => {
    console.log("hardwarePack (data Sprint): ", hardwarePack);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getHardwareList({ offset: (newPage - 1) * itemsPerPage });
    setIsEditing(false);
    setHardwareName("");
    setHardwareSpek("");
  };

  const backToPage1 = () => {
    setCurrentPage(1);
  };

  const handleClickAction = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleCloseAction = () => {
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
      title: "Product Category",
      value: "projectCtgrName",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "Hardware Name",
      value: "hardwareName",
      hidden: false,
      align: "left",
      width: "200px",
    },
    {
      title: "Specification",
      value: "spek",
      hidden: false,
      align: "left",
      width: "200px",
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
            onClick={(event) => handleClickAction(event, item)}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseAction}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className="shadow-none"
            PaperProps={{
              style: { border: "1px solid #e4ecf4" },
            }}>
            <MenuList sx={{ width: 150, maxWidth: "100%" }}>
              {/* MENU 1 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (dataMenu.active === "Y") {
                    setEditingData(dataMenu);
                    setHardwareName(dataMenu.hardwareName);
                    setHardwareSpek(dataMenu.spek);
                    setIsEditing(true);
                    handleCloseAction();
                  }
                }}
                title="Edit"
                disabled={dataMenu.active === "N"}>
                <ListItemGlobal type={"edit"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 2 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setEditedId(dataMenu.id);
                  setIsDelete(false);
                  setIsReset(false);
                  setValidModalOpen(true);
                  handleCloseAction();
                }}
                title={dataMenu.active === "Y" ? "Inactivate" : "Activate"}>
                <ListItemGlobal type={"editActive"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 3 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (dataMenu.active === "Y") {
                    setDeletedId(dataMenu.id);
                    setIsDelete(true);
                    setIsReset(false);
                    setValidModalOpen(true);
                    handleCloseAction();
                  }
                }}
                title="Delete"
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
    } else if (header.value === "spek") {
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
    getHardwareList(currentPage);
    getHardwareCount(currentPage);
  }, [hardwarePack, currentPage, itemsPerPage]);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div id="header-page" className="flex justify-between mb-2">
        <div>
          <h1 className="text-2xl md:text-2xl text-slate-800 font-bold">
            Hardware
          </h1>
        </div>
        <div className="flex justify-center">
          <Button
            type="bigIcon"
            iconName={faXmark}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/package-category");
            }}
            iconSize="text-xl"
            titleTooltip="Back"
          />
        </div>
      </div>
      <div id="content-page">
        <div id="textField-row" className="flex justify-between mb-5 mt-3">
          <div className="w-1/2 mr-3">
            <div className="w-full mb-2">
              <TextFieldGlobal
                label="Hardware Category"
                value={hardwarePack.projectCtgrName}
                readOnly={true}
              />
            </div>
            <div className="w-full mt-0.5">
              <TextFieldGlobal
                label="Hardware Name"
                placeholder="Enter any Hardware Name"
                value={hardwareName}
                onChange={(e) => setHardwareName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2 ml-3 mt-2.5">
            <TextFieldGlobal
              label="Specification"
              placeholder="Enter the Specification of Hardware"
              value={hardwareSpek}
              onChange={(e) => setHardwareSpek(e.target.value)}
              multiline={true}
              rows={3}
            />
          </div>
        </div>
        <div id="utility-row" className="mb-5">
          <div className="flex flex-wrap items-center -m-1.5">
            <div className="m-1.5">
              <Button
                type="primary"
                isEditing={isEditing}
                iconName={isEditing ? faCheck : faFloppyDisk}
                text={isEditing ? "Update" : "Save"}
                onClick={handleClick}
              />
            </div>
            <div className="m-1.5 hidden">
              <Button
                type="tertiary"
                iconName={faCheck}
                text="Check"
                onClick={handleCheck}
              />
            </div>
            <div className="m-1.5">
              <Button
                type="danger"
                iconName={faSquareMinus}
                text="Reset"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDelete(false);
                  setIsReset(true);
                  setValidModalOpen(true);
                }}
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="ml-3 flex">
              <DropdownDataPage
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                toPage1={backToPage1}
                onChange={(item) => setItemsPerPage(item)}
              />
            </div>
          </div>
        </div>
        <div id="table-row">
          <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
            <div className="overflow-x-auto">
              <CustomTable
                headers={tableHeaders}
                items={tableData}
                renderCell={renderCell}
                checkBox={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="footer-page" className="px-6 py-8">
        <PaginationGlobal
          totalItems={totalData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <HardwareValidation
        modalOpen={validModalOpen}
        setModalOpen={setValidModalOpen}
        isDelete={isDelete}
        isReset={isReset}
        deleteData={deleteHardware}
        editData={editStatusHardware}
        resetPage={resetPage}
      />
    </div>
  );
}
