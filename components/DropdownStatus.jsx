import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function DropdownStatus({ status, onChange, type }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

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
        value={status || "All"}
        label="Select Status"
        onChange={handleChange}
        inputProps={{
          endadornment: status && (
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
          ),
        }}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Y">Activated</MenuItem>
        <MenuItem value="N">Inactivated</MenuItem>
      </Select>
    </FormControl>
  );
}
