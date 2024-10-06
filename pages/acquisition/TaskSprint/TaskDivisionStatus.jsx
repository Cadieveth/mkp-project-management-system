import React, { useState, useEffect } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import config from "../../../../config";

export default function TaskDivisionStatus({ onChange, type, value }) {
  const [list, setList] = useState([]);

  const dataFetch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/combo/list?comboId=STATUSTASK`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();

      if (response.ok) {
        setList(data.result);
        console.log(data.meta.message);
      } else {
        console.log(data.meta.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <FormControl
      className="w-full"
      size="small"
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
      variant={type ? type : "standard"}>
      <InputLabel id="demo-select-small-label">Select Status</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Select Business"
        onChange={handleChange}
        inputProps={{
          endadornment: value && (
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
          ),
        }}>
        {list.map((item) => (
          <MenuItem key={item.code} value={item.code}>
            {`${item.propKey}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
