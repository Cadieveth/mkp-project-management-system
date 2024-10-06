import React from "react";
import Box from "@mui/material/Box/Box";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import ModalBlank from "./ModalBlank";

function Loading({ modalOpen, setModalOpen }) {
  return (
    <ModalBlank modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="py-3 px-3 text-center">
        <h2>The Most Reliable Traffic Intelligence Company</h2>
      </div>
      <div className="mb-3 px-3">
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </div>
    </ModalBlank>
  );
}

export default Loading;
