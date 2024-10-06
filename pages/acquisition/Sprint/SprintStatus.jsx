import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function SprintStatus({ status, onChange, show }) {
  const handleChange = (event) => {
    onChange(event.target.value); // Panggil fungsi onChange dengan nilai yang berubah
  };

  const handleClear = () => {
    onChange(""); // Clear status
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
      variant="standard">
      <InputLabel id="demo-select-small-label">Select Status</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={status || "OPEN"}
        label="Select Status"
        onChange={handleChange}
        inputProps={{
          endadornment: status && (
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
          ),
        }}>
        <MenuItem value="OPEN">OPEN</MenuItem>
        <MenuItem value="CLOSED WON">CLOSED WON</MenuItem>
        <MenuItem value="CLOSED LOST">CLOSED LOST</MenuItem>
      </Select>
    </FormControl>
  );
}
