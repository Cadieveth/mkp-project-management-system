import React from "react";
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import ModalCustom from "../../../components/ModalCustom";
import Button from "../../../components/Button";
import TaskDivisionStatus from "./TaskDivisionStatus";

export default function TaskDivisionModalStatus({
  modalOpen,
  setModalOpen,
  statusPack,
}) {
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleCheck = () => {
    console.log(statusPack);
  };

  return (
    <ModalCustom
      id="taskDivisionStatus-modal"
      modalOpen={modalOpen}
      setModalOpen={closeModal}
      title={`Change Status ${statusPack}`}
      type="sm">
      <div className="p-5">
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
            // value={value}
            label="Select Status"
            onChange={handleChange}>
            <MenuItem value="N">TODO</MenuItem>
            <MenuItem value="I">IN PROGRESS</MenuItem>
            <MenuItem value="F">DONE</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex justify-end mb-5 mr-5">
        <Button type="primary" text="Update" onClick={handleCheck} />
      </div>
    </ModalCustom>
  );
}
