import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box/Box";

const TextFieldDisabled = ({ value, label }) => {
  return (
    <Box
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "13px",
          height: "23px",
        },
        "$ .MuiInputLabel-root": {
          position: "static",
          fontSize: "17px",
        },
        "& .MuiFormLabel-root": {
          position: "relative",
          // transform: "translate(0, -30%)",
          top: "22px",
          fontSize: "15px",
        },
      }}>
      <TextField
        id="outlined-disabled"
        label={label}
        variant="outlined"
        size="small"
        fullWidth
        value={value}
        disabled
      />
    </Box>
  );
};

export default TextFieldDisabled;
