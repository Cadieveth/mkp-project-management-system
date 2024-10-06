import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import config from "../../../../config";

export default function BusinessDropdown({ onChange, type }) {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const dataFetch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/business/list?keyword=&status=Y&limit=25&offset=0`,
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
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const handleClear = () => {
    setValue("");
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
      <InputLabel id="demo-select-small-label">Select Business</InputLabel>
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
        <MenuItem value="">All</MenuItem>
        {list.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {`${item.businessCtgrCode} (${item.BusinessCtgrName})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
