import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

const TextFieldNumberGlobal = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
  readOnly,
  helperText,
  errorText,
}) => {
  // Menggunakan fungsi handleChange untuk memastikan hanya angka yang diterima
  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Jika nilai tidak valid, mengirimkan 0 sebagai nilai default
    const numericValue = isNaN(parseInt(inputValue, 10))
      ? 0
      : parseInt(inputValue, 10);

    onChange({
      target: {
        value: numericValue,
      },
    });
  };

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
        variant="standard"
        placeholder={placeholder}
        size="small"
        fullWidth
        value={value}
        onChange={handleChange} // Menggunakan handleChange yang baru
        disabled={disabled}
        InputProps={{
          readOnly: readOnly,
        }}
        helperText={helperText}
      />
    </Box>
  );
};

export default TextFieldNumberGlobal;
