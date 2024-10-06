import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box/Box";

const TextFieldGlobal = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  multiline,
  rows,
  readOnly,
  type,
  helperText,
  errorText,
}) => {
  const isError = errorText === true;
  return (
    <Box
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
      }}>
      <TextField
        error={errorText}
        id="outlined-basic"
        label={label}
        variant={type ? type : "standard"}
        placeholder={placeholder}
        size="small"
        fullWidth
        value={value}
        onChange={onChange}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        InputProps={{
          readOnly: readOnly,
        }}
        helperText={helperText}
      />
    </Box>
  );
};

export default TextFieldGlobal;
