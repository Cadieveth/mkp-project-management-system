import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../ContextProvider";
import {
  faCheck,
  faFloppyDisk,
  faPlus,
  faSquareMinus,
  faBars,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ModalCustom from "../../../components/ModalCustom";
import Button from "../../../components/Button";
import TextFieldGlobal from "../../../components/TextFieldGlobal";
import config from "../../../../config";
import CustomTable from "../../../components/CustomTable";
import { Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import ListItemGlobal from "../../../components/ListItemGlobal";
import ValidDelete from "../../../components/ValidDelete";
import TaskDivisionValidation from "./TaskDivisionValidation";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskDivisionModalLink({
  modalOpen,
  setModalOpen,
  divisionData,
  sprintData,
  taskData,
  getList,
}) {
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const tableData = list;
  const { setNotif } = useStateContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dataMenu, setDataMenu] = useState({});
  const [linkCode, setLinkCode] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [dataEdit, setDataEdit] = useState(null);
  const [validDelModalOpen, setValidDelModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState({});
  const [validModalOpen, setValidModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    // setLinkCode("");
    setTitle("");
    setLink("");
    getList();
  };

  const handleClick = (event, dataMenu) => {
    setAnchorEl(event.currentTarget);
    setDataMenu(dataMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDataMenu({});
  };

  const getLinkList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_ptms}/sprint/link/list?sprintId=${sprintData.id}&divisionId=${divisionData.divisionId}&taskId=${taskData.id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (sprintData.id === undefined || sprintData.id === null) {
          closeModal();
        } else if (
          divisionData.divisionId === undefined ||
          divisionData.divisionId === null
        ) {
          closeModal();
        } else if (taskData.id === undefined || taskData.id === null) {
          closeModal();
        }
        setList(data.result);
        // setLinkCode("");
        setIsEditing(false);
        setTitle("");
        setLink("");
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.log("error", error);
      // setNotif("error", error.message + "pesan");
    }
  };

  const saveAdd = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const newData = {
        sprintId: sprintData.id,
        // linkCode: linkCode,
        title: title,
        link: link,
        divisionId: divisionData.divisionId,
        taskId: taskData.id,
      };

      const response = await fetch(`${config.api_ptms}/sprint/link/add`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newData),
      });

      const data = await response.json();
      if (response.ok) {
        getLinkList();
        // setLinkCode("");
        setTitle("");
        setLink("");
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      // setNotif("error", error.message);
    }
  };

  const saveEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const editedData = {
        id: dataEdit.id,
        sprintId: dataEdit.sprintId,
        linkCode: linkCode,
        title: title,
        link: link,
        divisionId: divisionData.divisionId,
        taskId: taskData.id,
      };

      const response = await fetch(`${config.api_ptms}/sprint/link/edit`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(editedData),
      });

      const data = await response.json();

      if (response.ok) {
        getLinkList();
        // setLinkCode("");
        setTitle("");
        setLink("");
        setIsEditing(false);
        setNotif("success", data.meta.message);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      // setNotif("error", error.message);
    }
  };

  const resetData = () => {
    // setLinkCode("");
    setTitle("");
    setLink("");
    setIsEditing(false);
  };

  const handleCheck = () => {
    console.log("sprintData: ", sprintData);
    console.log("divisionData: ", divisionData);
    console.log("taskData: ", taskData);
  };

  const handleDeleteData = (data) => {
    setDeletedId(data.id);
    setIsDelete(true);
    setValidModalOpen(true);
  };

  const handleSaveClick = () => {
    if (isEditing) {
      saveEdit();
    } else {
      saveAdd();
    }
  };

  const tableHeaders = [
    {
      title: "Action",
      value: "action",
      hidden: false,
      align: "left",
      width: "10px",
    },
    {
      title: "Link",
      value: "link",
      hidden: false,
      align: "left",
      width: "10px",
    },
    {
      title: "Created by",
      value: "creationAuthor",
      hidden: false,
      align: "left",
      width: "100px",
    },
  ];

  const renderCell = (item, header) => {
    const formattedDateField = "createAt";
    // Action with menu
    // if (header.value === "action") {
    //   return (
    //     <div className="space-x-1 ml-2">
    //       <Button
    //         type="icon"
    //         iconName={faBars}
    //         onClick={(event) => handleClick(event, item)}
    //       />
    //       <Menu
    //         id="basic-menu"
    //         anchorEl={anchorEl}
    //         open={open}
    //         onClose={handleClose}
    //         MenuListProps={{
    //           "aria-labelledby": "basic-button",
    //         }}
    //         PaperProps={{
    //           style: {
    //             border: "1px solid #e4ecf4",
    //           },
    //         }}>
    //         <MenuList sx={{ width: 150 }}>
    //           {/* MENU 1 */}
    //           <MenuItem
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               setDataEdit(dataMenu);
    //               setLinkCode(dataMenu.linkCode);
    //               setTitle(dataMenu.title);
    //               setLink(dataMenu.link);
    //               setIsEditing(true);
    //               handleClose();
    //             }}>
    //             <ListItemGlobal type={"edit"} dataMenu={dataMenu} />
    //           </MenuItem>
    //           {/* MENU 2 */}
    //           <MenuItem
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               setDeletedId(dataMenu.id);
    //               setIsDelete(true);
    //               setValidModalOpen(true);
    //               handleClose();
    //             }}>
    //             <ListItemGlobal type={"delete"} dataMenu={dataMenu} />
    //           </MenuItem>
    //         </MenuList>
    //       </Menu>
    //     </div>
    //   );
    if (header.value === "action") {
      return (
        <Tooltip title="Delete Link" placement="right">
          <span className="ml-4">
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: "#eb3434", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteData(item);
              }}
            />
          </span>
        </Tooltip>
      );
    } else if (header.value === "link") {
      const linkUrl = item[header.value];
      const title = item["title"]; // Ambil nilai "title"

      const handleLinkClick = () => {
        const fullUrl = linkUrl.startsWith("http")
          ? linkUrl
          : `http://${linkUrl}`;
        window.open(fullUrl, "_blank");
      };

      return (
        <a
          href="#"
          onClick={handleLinkClick}
          style={{
            color: "#0004ff",
            textDecoration: "underline",
            cursor: "pointer",
          }}>
          {title ? title : "-"}
        </a>
      );
      // } else if (formattedDateField === header.value) {
      //   const formattedDate = moment(
      //     item[formattedDateField],
      //     "YYYYMMDDHHmmss"
      //   ).format("DD MMM YYYY");
      //   return (
      //     <span> {formattedDate === "Invalid date" ? "-" : formattedDate} </span>
      //   );
    } else if (header.value === "creationAuthor") {
      const formattedDate = moment(
        item[formattedDateField],
        "YYYYMMDDHHmmss"
      ).format("DD MMM YYYY HH:mm:ss");
      return (
        <div>
          <span className="font-bold" style={{ fontSize: "13px" }}>
            {item.createUsername &&
            item.createUsername.trim() !== "" &&
            item.createUsername !== "-"
              ? item.createUsername
              : "Unavailable User Create Data"}
          </span>
          <br />
          <span className="flex">
            <div className="font-bold text-xs -mt-1">At:</div>
            <div className="text-xs ml-1 -mt-1">
              {formattedDate === "Invalid date" ? "-" : formattedDate}
            </div>
          </span>
        </div>
      );
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    if (modalOpen) {
      getLinkList();
    }
  }, [modalOpen]);

  return (
    <ModalCustom
      id="taskDivision-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title="Link Task"
      type="3xl">
      <div className="px-5 mt-3 mb-5">
        <div id="content-container">
          <div id="textField-container">
            {/* <div className="w-full mb-3">
              <TextFieldGlobal
                label="Link Code"
                placeholder={`Enter any Code Link`}
                readOnly={isEditing ? true : false}
                value={linkCode}
                onChange={(e) => setLinkCode(e.target.value)}
              />
            </div> */}
            <div className="flex justify-between">
              <div className="w-1/2 mr-3">
                <TextFieldGlobal
                  label="Link Title"
                  placeholder={`Enter any Title Link`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="w-1/2 ml-3">
                <TextFieldGlobal
                  label="Link"
                  placeholder={`Enter the Link URL`}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              type="primary"
              isEditing={isEditing}
              iconName={isEditing ? faCheck : faFloppyDisk}
              text={isEditing ? "Update" : "Save"}
              onClick={handleSaveClick}
            />
          </div>
          <div id="table-container" className="mt-5">
            <CustomTable
              headers={tableHeaders}
              items={tableData}
              renderCell={renderCell}
              checkBox={false}
            />
          </div>
        </div>
        <div id="button-container" className="flex justify-end mt-5 hidden">
          <div className="mr-2">
            <Button
              type="tertiary"
              iconName={faCheck}
              text="Check"
              onClick={handleCheck}
            />
          </div>
          <div className="mr-2">
            <Button
              type="danger"
              iconName={faSquareMinus}
              text="Reset"
              onClick={(e) => {
                e.stopPropagation();
                setIsDelete(false);
                setValidModalOpen(true);
              }}
            />
          </div>
        </div>
        <ValidDelete
          modalOpen={validDelModalOpen}
          setModalOpen={setValidDelModalOpen}
          getDataList={getLinkList}
          apiUrl={`${config.api_ptms}/sprint/link/remove/${deletedId}`}
        />
        <TaskDivisionValidation
          modalOpen={validModalOpen}
          setModalOpen={setValidModalOpen}
          isDelete={isDelete}
          resetData={resetData}
          apiUrl={`${config.api_ptms}/sprint/link/remove/${deletedId}`}
          getLinkList={getLinkList}
        />
      </div>
    </ModalCustom>
  );
}
