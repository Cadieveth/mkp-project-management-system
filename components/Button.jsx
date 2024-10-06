import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

const Button = ({
  type,
  iconName,
  text,
  onClick,
  iconSize,
  titleTooltip,
  placement,
}) => {
  let buttonClass = "";
  let textColor = "";

  switch (type) {
    case "primary":
      buttonClass = "btn-sm bg-blue-800 hover:bg-blue-900 text-white";
      textColor = "white";
      break;
    case "secondary":
      buttonClass =
        "btn-sm border-slate-200 hover:border-slate-300 text-indigo-500";
      textColor = "indigo-500";
      break;
    case "tertiary":
      buttonClass =
        "btn-sm border-slate-200 hover:border-slate-300 text-slate-600";
      textColor = "slate-600";
      break;
    case "danger":
      buttonClass = "btn-sm bg-rose-500 hover:bg-rose-600 text-white";
      textColor = "white";
      break;
    case "success":
      buttonClass = "btn-sm bg-emerald-500 hover:bg-emerald-600 text-white";
      textColor = "white";
      break;
    case "danger2":
      buttonClass =
        "btn-sm border-slate-200 hover:border-slate-300 text-rose-500";
      textColor = "rose-500";
      break;
    case "icon":
      buttonClass = "p-0 m-0 bg-transparent border-none";
      textColor = "slate-600";
      break;
    case "bigIcon":
      buttonClass = "p-0 m-0 bg-transparent border-none";
      textColor = "slate-600";
      break;
    case "special":
      buttonClass = "p-0 btn-sm hover:border-slate-300 text-white";
      textColor = "blue-900";
      break;
    default:
      break;
  }

  return (
    <Tooltip title={titleTooltip} placement={placement ? placement : "left"}>
      <button className={buttonClass} onClick={onClick}>
        {iconName && (
          <FontAwesomeIcon
            icon={iconName}
            className={`text-${iconSize} mr-2 ml-2 text-${textColor}`}
          />
        )}
        <span className={`ml-1 mr-2 text-${textColor}`}>{text}</span>
      </button>
    </Tooltip>
  );
};

export default Button;
