import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const KeywordForm = ({ keyword, onChange, type }) => {
  const clearKeyword = () => {
    onChange("");
  };

  const customStyles = {
    textField: {
      width: "100%",
    },
    clearButton: {
      color: "white",
    },
  };

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
        className="w-full"
        id="form-search"
        label="Keyword"
        variant={type ? type : "standard"}
        size="small"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        inputProps={{
          endadornment: keyword && ( // Tombol "X" muncul hanya jika ada keyword
            <IconButton onClick={clearKeyword} size="small">
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default KeywordForm;
