import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import config from "../../../../config";
import { arrOfObjUniqueIdentifier } from "../../../utils/Utils";

export default function SprintDropdown({ onChange, value }) {
  const [list, setList] = useState([]);

  const dataFetch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_ptms}/sprint/list?sprintCode&projectCtgrId&accountId&limit=25&offset=0&status=OPEN`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        // setList(data.result);
        const result = arrOfObjUniqueIdentifier(data.result, "sprintCode");
        const dataToPush = result.map((item) => ({
          value: item.id,
          label: item.sprintCode,
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

  const handleChange = (event) => {
    onChange(event.target.value); // Ubah ini sesuai dengan kebutuhan Anda
  };

  const handleClear = () => {
    onChange("");
  };

  useEffect(() => {
    dataFetch().then(() => {
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
      id="sprint-autocomplete"
      options={list}
      value={value}
      // getOptionLabel={(option) =>
      //   `${option.accountName} (${option.accountCode})`
      // }
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} label="Select Sprint" variant="standard" />
      )}
    />
  );
}
