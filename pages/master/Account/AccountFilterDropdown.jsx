import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import config from "../../../../config";
import { arrOfObjUniqueIdentifier } from "../../../utils/Utils";

export default function AccountFilterDropdown({
  onChange,
  value,
  helperText,
  errorText,
}) {
  const [selectedValue, setSelectedValue] = useState({
    value: -99,
    label: "All",
  });
  const [list, setList] = useState([]);

  const dataFetch = async () => {
    try {
      const allOption = { value: -99, label: "All" };
      setList([allOption]);

      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/account/list?keyword&status=Y&limit=25&offset=0`,
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
          "accountName",
          "accountCode"
        );
        const allOption = { value: -99, label: "All" };
        const dataToPush = [
          allOption,
          ...result.map((item) => ({
            value: item.id,
            label: item.accountName,
          })),
        ];
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
    const newValue = event.target.value;
    setSelectedValue(newValue || { value: -99, label: "All" });
    onChange(newValue);
  };

  const handleClear = () => {
    onChange("");
  };

  useEffect(() => {
    dataFetch().then(() => {
      setSelectedValue({ value: -99, label: "All" });
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
      id="account-autocomplete"
      options={list}
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Account"
          variant="standard"
          helperText={helperText}
          error={errorText}
        />
      )}
    />
  );
}
