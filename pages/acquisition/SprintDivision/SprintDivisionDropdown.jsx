import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import config from "../../../../config";

export default function SprintDivisionDropdown({
  onChange,
  setSelectedDivisionToAdd,
  type,
  reset,
}) {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const dataFetch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/division/list?keyword&status=Y&limit=25&offset=0`,
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
    const selectedValue = event.target.value;
    const selectedDivision = list.find((item) => item.id === selectedValue);

    if (selectedDivision) {
      setSelectedDivisionToAdd(selectedDivision);
    }

    setValue(selectedValue);
    onChange(selectedValue);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useEffect(() => {
    if (reset) {
      setValue("");
      onChange("");
    }
  }, [reset]);

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
      <InputLabel id="demo-select-small-label">Select Division</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Select Division"
        onChange={handleChange}
        inputProps={{
          endadornment: value && (
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
          ),
        }}>
        <MenuItem value="">None</MenuItem>
        {list.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {`${item.divisionName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
