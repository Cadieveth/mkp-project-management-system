// ListItemGlobal.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faPenToSquare,
  faTrash,
  faLock,
  faLockOpen,
  faFolderOpen,
  faMicrochip,
  faEllipsisVertical,
  faBars,
  faListCheck,
  faFileCirclePlus,
  faFileLines,
  faFileExport,
  faLink,
  faDiagramProject,
  faHand,
} from "@fortawesome/free-solid-svg-icons";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";

function ListItemGlobal({ type, dataMenu }) {
  const noShadowStyles = {
    boxShadow: "none", // Menghilangkan shadow
  };
  if (type === "edit") {
    return (
      <>
        <ListItemIcon style={noShadowStyles}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#ebc334" }
            }
          />
        </ListItemIcon>
        <ListItemText style={noShadowStyles}>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#ebc334" }
            }>
            Edit
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "editActive") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={dataMenu.active === "Y" ? faLock : faLockOpen}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#eb3434" }
                : { color: "#1c44ac" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#eb3434" }
                : { color: "#1c44ac" }
            }>
            Edit Active
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "delete") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faTrash}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#eb3434" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#eb3434" }
            }>
            Delete
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "parameter") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faFolderOpen}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#20a862" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#20a862" }
            }>
            Parameter
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "hardware") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faMicrochip}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#20a862" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#20a862" }
            }>
            Hardware
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "task") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faListCheck}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#20a862" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#20a862" }
            }>
            Task
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "addMoM") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faFileCirclePlus}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#659468" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#659468" }
            }>
            Add MoM
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "MoM") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faFileLines}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#107018" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#107018" }
            }>
            MoM
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "survey") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faFileExport}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#166aab" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#166aab" }
            }>
            Survey
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "addSurvey") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faFileCirclePlus}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#5683a6" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#5683a6" }
            }>
            Add Survey
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "link") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faLink}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#454647" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#454647" }
            }>
            Link
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "document") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faFileCirclePlus}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#000000" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#000000" }
            }>
            Document
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "division") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faDiagramProject}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#ab6d16" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#ab6d16" }
            }>
            Division
          </div>
        </ListItemText>
      </>
    );
  } else if (type === "dragNDrop") {
    return (
      <>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faHand}
            className="w-4 h-4 mb-0 mr-0"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#ab6d16" }
            }
          />
        </ListItemIcon>
        <ListItemText>
          <div
            className="text-sm"
            style={
              dataMenu.active === "N"
                ? { color: "#575957" }
                : { color: "#ab6d16" }
            }>
            Drag & Drop
          </div>
        </ListItemText>
      </>
    );
  } else {
    return null; // Untuk kasus lainnya atau jika tipe tidak valid
  }
}

export default ListItemGlobal;
