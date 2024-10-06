import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { arrOfObjUniqueIdentifier } from "../../../utils/Utils";
import config from "../../../../config";

export default function LinkDropdown({
  onChange,
  value,
  helperText,
  errorText,
  sprintId,
}) {
  const [list, setList] = useState([]);

  const dataFetchLink = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/link/list/${sprintId}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        const result = arrOfObjUniqueIdentifier(
          data.result,
          "linkCode",
          "title"
        );
        const dataToPush = result.map((item) => ({
          value: item.id,
          label: item.linkCode + "  -  " + item.title,
        }));
        setList(dataToPush);
      } else {
        setNotif("warning", data.meta.message);
      }
    } catch (error) {
      console.error(error);
      setNotif("error", error.message);
    }
  };

  useEffect(() => {
    dataFetchLink().then(() => {
      console.log("Data dari API:", list);
    });
  }, []);

  return (
    <Autocomplete
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "13px",
          height: "23px",
          outlineWidth: "0px",
          boxShadow: "none !important",
        },
        "$ .MuiInputLabel-root": {
          position: "static",
          fontSize: "13px",
        },
        "& .MuiFormLabel-root": {
          fontWeight: "bold",
          fontSize: "15px",
        },
      }}
      disablePortal
      id="link-autocomplete"
      options={list}
      value={value}
      onChange={(event, value) => {
        onChange(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Link"
          variant="standard"
          helperText={helperText}
          error={errorText}
        />
      )}
    />
  );
}
