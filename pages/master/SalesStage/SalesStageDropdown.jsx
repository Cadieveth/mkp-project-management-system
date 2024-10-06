import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import config from "../../../../config";
import { arrOfObjUniqueIdentifier } from "../../../utils/Utils";

export default function SalesStageDropdown({
  onChange,
  value,
  helperText,
  errorText,
}) {
  const [list, setList] = useState([]);

  const dataFetch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/sales-stage/list?keyword=&status=Y&limit=25&offset=0`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        // setList(data.result);
        const result = arrOfObjUniqueIdentifier(
          data.result,
          "salesStageName",
          "salesStageCode"
        );
        const dataToPush = result.map((item) => ({
          value: item.id,
          // label: item.salesStageName + "(" + item.salesStageCode + ")",
          label: item.salesStageName + "  -  " + item.description,
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
      id="salesStage-autocomplete"
      options={list}
      value={value}
      // getOptionLabel={(option) =>
      //   `${option.accountName} (${option.accountCode})`
      // }
      // onChange={onChange}
      onChange={(event, value) => {
        onChange(value); // Panggil onChange hanya ketika ada perubahan nilai
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Sales Stage"
          variant="standard"
          helperText={helperText}
          error={errorText}
        />
      )}
    />
  );
}
