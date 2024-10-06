import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function DropdownDataPage({
  itemsPerPage,
  setItemsPerPage,
  onChange,
  toPage1,
}) {
  return (
    <Box
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "13px",
          height: "18px",
        },
        "$ .MuiInputLabel-root": {
          position: "static",
          fontSize: "17px",
        },
        "& .MuiFormLabel-root": {
          position: "relative",
          top: "22px",
          fontSize: "15px",
        },
      }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          <b>Row</b>
        </InputLabel>
        <NativeSelect
          // defaultValue={itemsPerPage}
          value={itemsPerPage}
          inputProps={{
            name: "itemsPerPage",
            id: "uncontrolled-native",
          }}
          onChange={(e) => {
            const newItemsPerPage = parseInt(e.target.value);
            setItemsPerPage(newItemsPerPage);
            toPage1();
            onChange(e.target.value);
          }}>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
