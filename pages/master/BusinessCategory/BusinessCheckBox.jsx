import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styled from "@mui/material/styles/styled";
import config from "../../../../config";
import { FormControl, FormLabel, FormHelperText } from "@mui/material";

export default function BusinessCheckBox({
  onChange,
  selectedValues,
  helperText,
  errorText,
}) {
  const [list, setList] = useState([]);

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#e6e3e3",
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#1c5fc7" : "#1c5fc7",
    },
    "input:disabled ~ &": {
      background: theme.palette.mode === "dark" ? "#474745" : "#474745",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#1c44ac",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#1c5fc7",
    },
  });

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

  useEffect(() => {
    dataFetch();
  }, []);

  const handleChange = (event, id) => {
    const isChecked = event.target.checked;
    const updatedValues = isChecked
      ? [...(selectedValues || []), id]
      : (selectedValues || []).filter((value) => value !== id);
    onChange(updatedValues);
  };

  return (
    <FormControl
      required
      error={errorText}
      component="fieldset"
      sx={{ m: 3 }}
      variant="standard">
      <FormGroup aria-label="position" row>
        {list.map((business) => (
          <FormControlLabel
            key={business.id}
            control={
              <Checkbox
                sx={{
                  "&:hover": { bgcolor: "transparent" },
                }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                inputProps={{ "aria-label": "Checkbox demo" }}
                checked={(selectedValues || []).includes(business.id)}
                onChange={(event) => handleChange(event, business.id)}
              />
            }
            label={
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#737379",
                }}>
                {" "}
                {business.BusinessCtgrName}
              </span>
            }
          />
        ))}
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
