import React, { useState, useEffect } from "react";
import config from "../../../../config";
import Button from "../../../components/Button";
import DropdownStatus from "../../../components/DropdownStatus";
import { faPlus, faFilter, faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../ContextProvider";
import PaginationGlobal from "../../../components/PaginationGlobal";
import BadgeGlobal from "../../../components/BadgeGlobal";
import CustomTable from "../../../components/CustomTable";
import Menu from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import MenuList from "@mui/material/MenuList/MenuList";
import KeywordForm from "../../../components/KeywordForm";
import DropdownDataPage from "../../../components/DropdownDataPage";
import ListItemGlobal from "../../../components/ListItemGlobal";
import PackageCategoryModal from "./PackageCategoryModal";
import ScrollToTop from "../../../components/ScrollToTop";
import { handleTokenExpired } from "../../../utils/Utils";
import PackageCategoryValidation from "./PackageCategoryValidation";
// import { data } from "autoprefixer";

function PackageCategoryTable() {
  const [list, setList] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataResult, setDataResult] = useState({});
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("All");
  const [dataDelete, setDataDelete] = useState({});
  const [dataEdit, setDataEdit] = useState(0);
  const { setNewData } = useStateContext();
  const { setNewDataHardware } = useStateContext();
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const navigate = useNavigate();
  const { setLoadingState, setNotif, setNewHardwarePack, setNewParameterPack } =
    useStateContext();
  const tableData = list;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dataMenu, setDataMenu] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [validModalOpen, setValidModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const getPackageList = async (page, status = "") => {
    setLoadingState(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      console.log(status);

      const offset = (page - 1) * itemsPerPage;

      const response = await fetch(
        `${config.api_master}/project-ctgr/list?keyword=${keyword}&status=${
          status == "All" ? "" : status
        }&limit=${itemsPerPage}&offset=${offset}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("ini response: ", response);
        if (data.message === "invalid or expired jwt") {
          localStorage.removeItem("accessToken");
          navigate("/signin");
          setNotif("warning", "Token expired, silahkan login kembali");
        } else {
          if (response.status === 401) {
            handleTokenExpired();
          } else {
            setList(data.result);
            console.log("Ini data ygy: ", data);
            setNotif("success", data.meta.message);
            handleClose();
          }
        }
      } else {
        // if (response.status === 401) {
        //   handleTokenExpired();
        // } else {
        //   setNotif("warning", data.meta.message);
        // }
        console.log("ini response: ", response);
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
    setTimeout(() => {
      setLoadingState(false);
    }, 0);
  };

  const getPackageCount = async (page, status = "") => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${
          config.api_master
        }/project-ctgr/count-list?keyword=${keyword}&status=${
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
        console.log("Gagal mengambil data Count");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePackage = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/project-ctgr/remove/${dataDelete}`,
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
        getPackageList(currentPage, status, keyword);
        getPackageCount(currentPage, status, keyword);
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

  const editStatusPackage = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(
        `${config.api_master}/project-ctgr/edit-active/${dataEdit}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        getPackageList(currentPage, status, keyword);
        getPackageCount(currentPage, status, keyword);
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
    getPackageList(1, encodedStatus);
    getPackageCount(1, encodedStatus);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const resetFilters = () => {
    setKeyword("");
    setStatus("");
  };

  const HoldKeyStat = () => {
    setKeyword(keyword);
    setStatus(status);
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
      title: "Product Category Code",
      value: "projectCtgrCode",
      hidden: false,
      align: "left",
      width: "350px",
    },
    {
      title: "Product Category Name",
      value: "projectCtgrName",
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
              style: {
                border: "1px solid #e4ecf4",
              },
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
                  e.stopPropagation();
                  setDataEdit(dataMenu.id);
                  setValidModalOpen(true);
                  setIsDelete(false);
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
                    setDataDelete(dataMenu.id);
                    setValidModalOpen(true);
                    setIsDelete(true);
                    handleClose();
                  }
                }}
                disabled={dataMenu.active === "N"}>
                <ListItemGlobal type={"delete"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 4 */}
              <MenuItem
                disabled={dataMenu.active === "N"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (dataMenu.active === "Y") {
                    setNewParameterPack(dataMenu);
                    navigate("/package-category/parameter-package");
                  }
                }}>
                <ListItemGlobal type={"parameter"} dataMenu={dataMenu} />
              </MenuItem>
              {/* MENU 5 */}
              <MenuItem
                disabled={dataMenu.active === "N"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (dataMenu.active === "Y") {
                    // setNewDataHardware(dataMenu);
                    setNewHardwarePack(dataMenu);
                    navigate("/package-category/hardware-package");
                  }
                }}>
                <ListItemGlobal type={"hardware"} dataMenu={dataMenu} />
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
    getPackageList(currentPage, status, keyword);
    getPackageCount(currentPage, status, keyword);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="rounded-2xl bg-white px-5 py-5 border border-slate-200">
      <div>
        <h1 className="text-2xl md:text-2xl text-slate-800 font-bold">
          Product Category
        </h1>
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
      <PackageCategoryModal
        isEditing={isEditing}
        modalOpen={isEditing ? editModalOpen : addModalOpen}
        setModalOpen={isEditing ? setEditModalOpen : setAddModalOpen}
        dataResult={dataResult}
        getDataList={getPackageList}
        getDataCount={getPackageCount}
        setCurrentPage={currentPage}
        setKeyword={keyword}
        setStatus={status}
        toPage1={backToPage1}
        config={config}
      />
      <PackageCategoryValidation
        modalOpen={validModalOpen}
        setModalOpen={setValidModalOpen}
        isDelete={isDelete}
        deleteData={deletePackage}
        editData={editStatusPackage}
      />
    </div>
  );
}

export default PackageCategoryTable;
