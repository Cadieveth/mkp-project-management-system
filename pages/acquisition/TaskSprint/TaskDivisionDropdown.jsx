import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import config from "../../../../config";
import { arrOfObjUniqueIdentifier } from "../../../utils/Utils";
import { useStateContext } from "../../../ContextProvider";

export default function TaskDivisionDropdown({ onChange, value }) {
  const [list, setList] = useState([]);
  const { dataSprint } = useStateContext();

  const dataFetch = async () => {
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
        // const formattedData = data.result.map((item) => ({
        //   id: item.id,
        //   label: `${item.linkCode} - ${item.title}`,
        // }));
        // setList(formattedData);
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
        console.log(data.meta.message);
      } else {
        console.log(data.meta.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  // useEffect(() => {
  //   // Set nilai default jika defaultValue tidak undifined
  //   if (defaultValue !== undefined) {
  //     onChange(null, defaultValue);
  //   }
  // }, [defaultValue]);
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
      id="taskDivision-autocomplete"
      options={list}
      // getOptionLabel={(option) => option.label}
      // value={value}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} label="Select Link" variant="standard" />
      )}
    />
  );
}
