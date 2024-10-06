import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import config from "../../../../config";
import { arrOfObjUniqueIdentifier } from "../../../utils/Utils";
import ModalDate from "../../../components/ModalDate";

export default function TaskDivisionNewStatusDropdown({
  onChange,
  value,
  hidden,
  itemId,
  getTaskDivisionList,
}) {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [id, setId] = useState(0);
  const [status, setStatus] = useState("");

  const dataFetch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `${config.api_master}/combo/list?comboId=STATUSTASK`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      if (response.ok) {
        const result = arrOfObjUniqueIdentifier(data.result, "propKey");
        const dataToPush = result.map((item) => ({
          value: item.code,
          label: item.propKey,
        }));
        setList(dataToPush);
        getTaskDivisionList();
      } else {
        console.log(data.meta.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (event, newValue, selectedDate) => {
    console.log(newValue.value);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      let data;

      if (newValue.value === "DONE") {
        setId(itemId);
        setStatus(newValue.value);
        setModalOpen(true);
      } else {
        data = {
          id: itemId,
          status: newValue.value,
        };
      }

      const response = await fetch(
        `${config.api_ptms}/sprint/task-division/edit-status`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );
      const responseJSON = await response.json();
      if (response.ok) {
        console.log(responseJSON.meta.message);
        getTaskDivisionList();
        console.log(responseJSON.meta.message);
        onChange(newValue.label);
        setModalOpen(false);
        console.log("dari Dropdown: ", modalOpen);
      } else {
        console.log(responseJSON.meta.message);
        console.log(responseJSON.meta.message);
      }
    } catch (error) {
      console.error(error);
      console.log(error.message);
    }
  };

  const handleCheck = (selectedDate) => {
    console.log("Selected Date: ", selectedDate);
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <>
      <Autocomplete
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "12px",
            height: "12px",
            outlineWidth: "0px",
            boxShadow: "none !important",
          },
          "$ .MuiInputLabel-root": {
            position: "static",
            fontSize: "13px",
          },
          "& .MuiFormLabel-root": {
            fontWeight: "bold",
            fontSize: "10px",
          },
        }}
        disablePortal
        disableClearable
        id="taskDivisionNewStatus-autocomplete"
        options={list}
        value={{ label: value, value: value }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Status"
            variant="standard"
            InputLabelProps={{
              style: { display: hidden ? "none" : "block" },
            }}
          />
        )}
      />
      <ModalDate
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={id}
        status={status}
        getDataList={getTaskDivisionList}
      />
    </>
  );
}
