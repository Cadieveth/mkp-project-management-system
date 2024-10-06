import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import { faPlus, faFilter, faBars } from "@fortawesome/free-solid-svg-icons";
import config from "../../../../config";
import Button from "../../../components/Button";
import PaginationGlobal from "../../../components/PaginationGlobal";
import DropdownStatus from "../../../components/DropdownStatus";
import BadgeGlobal from "../../../components/BadgeGlobal";
import CustomTable from "../../../components/CustomTable";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import MenuList from "@mui/material/MenuList/MenuList";
import ListItemGlobal from "../../../components/ListItemGlobal";
import KeywordForm from "../../../components/KeywordForm";
import DropdownDataPage from "../../../components/DropdownDataPage";
import BusinessCategoryModal from "./BusinessCategoryModal";
import { handleTokenExpired } from "../../../utils/Utils";
import BusinessCategoryValidation from "./BusinessCategoryValidation";

function BusinessCategoryTable() {
  const [list, setList] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataResult, setDataResult] = useState({});
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [dataDelete, setDataDelete] = useState({});
  const [dataEdit, setDataEdit] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const navigate = useNavigate();
  const { setLoadingState, setNotif } = useStateContext();
  const tableData = list;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dataMenu, setDataMenu] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [validModalOpen, setValidModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const getBusinessList = async (page, status = "") => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `${config.api_master}/business/list?keyword=${keyword}&status=${
          status == "All" ? "" : status
        }&limit=${itemsPerPage}&offset=${offset}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
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

  const getBusinessCount = async (page, status = "") => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/business/count-list?keyword=${keyword}&status=${
          status == "All" ? "" : status
        }`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTotalData(data.result);
      } else {
        console.log(data.meta.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBusiness = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/business/remove/${dataDelete}`,
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
        getBusinessList(currentPage, status, keyword);
        getBusinessCount(currentPage, status, keyword);
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

  const editStatusBusiness = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/business/edit-active/${dataEdit}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        getBusinessList(currentPage, status, keyword);
        getBusinessCount(currentPage, status, keyword);
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
    getBusinessList(1, encodedStatus);
    getBusinessCount(1, encodedStatus);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
  };

  const resetFilters = () => {
    setKeyword("");
    setStatus("");
  };

  const backToPage1 = () => {
    setCurrentPage(1);
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
      title: "Business Code",
      value: "businessCtgrCode",
      hidden: false,
      align: "left",
      width: "350px",
    },
    {
      title: "Business Name",
      value: "BusinessCtgrName",
      hidden: false,
      align: "left",
      width: "400px",
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
            }}
            PaperProps={{
              style: { border: "1px solid #e4ecf4" },
            }}>
            <MenuList sx={{ width: 150, maxWidth: "100%" }}>
              {/* MENU 1 */}
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  if (dataMenu.active === "Y") {
                    setEditModalOpen(true);
                    setIsEditing(true);
                    setDataResult(dataMenu);
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
                  if (dataMenu.active === "Y") {
                    setValidModalOpen(true);
                    setIsDelete(true);
                    setDataDelete(dataMenu.id);
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
    } else {
      return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    }
  };

  useEffect(() => {
    getBusinessList(currentPage, status, keyword);
    getBusinessCount(currentPage, status, keyword);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div>
        <h1 className="text-2xl md:text-2xl text-slate-800 font-bold">
          Business Product Category
        </h1>
      </div>
      <div className="row mb-5">
        <div className="flex justify-between">
          <div className="mr-2 w-1/2">
            <KeywordForm value={keyword} onChange={handleKeywordChange} />
          </div>
          <div className="w-1/2 ml-2">
            <div className="w-full">
              <DropdownStatus status={status} onChange={handleStatusChange} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
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
      <div className="px-6 py-8">
        <PaginationGlobal
          totalItems={totalData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <BusinessCategoryModal
        isEditing={isEditing}
        modalOpen={isEditing ? editModalOpen : addModalOpen}
        setModalOpen={isEditing ? setEditModalOpen : setAddModalOpen}
        dataResult={dataResult}
        getDataList={getBusinessList}
        getDataCount={getBusinessCount}
        setCurrentPage={currentPage}
        setKeyword={keyword}
        setStatus={status}
        toPage1={backToPage1}
        config={config}
      />
      <BusinessCategoryValidation
        modalOpen={validModalOpen}
        setModalOpen={setValidModalOpen}
        isDelete={isDelete}
        deleteData={deleteBusiness}
        editData={editStatusBusiness}
      />
    </div>
  );
}

export default BusinessCategoryTable;
