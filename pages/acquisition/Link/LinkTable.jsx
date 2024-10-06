import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import {
  faArrowLeft,
  faPlus,
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem, MenuList } from "@mui/material";
import config from "../../../../config";
import Button from "../../../components/Button";
import ListItemGlobal from "../../../components/ListItemGlobal";
import CustomTable from "../../../components/CustomTable";
import LinkModal from "./LinkModal";
import LinkValid from "./LinkValid";

function LinkTable() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { setLoadingState, setNotif, dataSprint, openViaDivision } =
    useStateContext();
  const [dataMenu, setDataMenu] = useState({});
  const [dataResult, setDataResult] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const tableData = list;

  const getLinkList = async () => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/link/list/${dataSprint.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (dataSprint.id === undefined || dataSprint.id === null) {
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

  const closePage = () => {
    openViaDivision ? navigate("/sprint/Division") : navigate("/sprint-add");
  };

  const handleClick = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleCheck = () => {
    console.log("Data List: ", list);
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
      title: "Link Code",
      value: "linkCode",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Title",
      value: "title",
      hidden: false,
      align: "left",
      width: "150px",
    },
    {
      title: "Link",
      value: "link",
      hidden: false,
      align: "left",
      width: "300px",
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
                  setDataResult(dataMenu);
                  setIsEditing(true);
                  setEditModalOpen(true);
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
    } else if (header.value === "link") {
      const linkUrl = item[header.value];

      return (
        <a
          href={linkUrl.startsWith("http") ? linkUrl : `http://${linkUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0004ff", textDecoration: "underline" }}>
          {linkUrl ? linkUrl : "-"}
        </a>
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    getLinkList();
  }, [editModalOpen]);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl md:text-2xl text-slate-800 font-bold">
            Link
          </div>
          <div className="text-sm"> {dataSprint.sprintCode}</div>
        </div>
        <div className="flex justify-center">
          <Button
            type="bigIcon"
            iconName={faXmark}
            onClick={(e) => {
              e.stopPropagation();
              closePage();
            }}
            iconSize="text-xl"
            titleTooltip="Back"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="mt-5">
          <Button
            type="primary"
            iconName={faPlus}
            text="Add Data"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(false);
              setAddModalOpen(true);
            }}
          />
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative mt-5">
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
      <LinkModal
        dataSprint={dataSprint}
        isEditing={isEditing}
        modalOpen={isEditing ? editModalOpen : addModalOpen}
        setModalOpen={isEditing ? setEditModalOpen : setAddModalOpen}
        dataResult={dataResult}
        getDataList={getLinkList}
      />
      <LinkValid
        modalOpen={validDelModalOpen}
        setModalOpen={setValidDelModalOpen}
        getDataList={getLinkList}
        apiUrl={`${config.api_ptms}/sprint/link/remove/${dataDelete}`}
      />
    </div>
  );
}

export default LinkTable;
