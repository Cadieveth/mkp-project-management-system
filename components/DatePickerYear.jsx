import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import makeStyles from "@mui/styles/makeStyles/makeStyles";

// import "./style.css";
import "./../components/styleComponent/style.css";

const useStyles = makeStyles({
  root: {
    "flex-direction": "row",
    gap: "10px",
  },
});

function DatePickerYear({ label = "Year", value = "", onChange, className }) {
  const [date, setDate] = useState(value);
  const dateTo = moment().format("YYYY-MM-DD");
  const [open, setOpen] = useState(false);
  const [cleared, setCleared] = React.useState(false);

  const clasees = useStyles();

  const displayValue = date === "Invalid Date" ? "" : date;

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);
  return (
    <div className={`${className}`}>
      {/* {label === "_" ? (
        <label className="text-xs font-bold mb-1">{label}</label>
      ) : (
        <label className="text-xs font-semibold mb-1">{label}</label>
      )} */}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label={label}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          className="w-full"
          value={value}
          onChange={onChange}
          inputFormat="YYYY"
          InputProps={{
            classes: { root: clasees.root },
          }}
          views={["year"]}
          openTo="year"
          renderInput={(params) => (
            <TextField
              onClick={(e) => setOpen(true)}
              variant="standard"
              {...params}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "13px",
                  height: "30.5px",
                  outlineWidth: "0px",
                  boxShadow: "none !important",
                },
                "$ .MuiInputLabel-root": {
                  position: "static",
                  fontSize: "13px",
                },
                "& .MuiFormLabel-root": {
                  marginTop: "8px",
                  fontWeight: "bold",
                  fontSize: "15px",
                },
              }}
              error={false}
              value={displayValue}
            />
          )}
          slotProps={{
            inputAdornment: {
              position: "start",
            },
            textField: {
              classes: {
                root: "inputPadding",
              },
              onClick: () => {
                setOpen(true);
              },
              variant: "standard",
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DatePickerYear;
