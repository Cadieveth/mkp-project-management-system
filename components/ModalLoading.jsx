import React, { useRef, useEffect } from "react";
import { Modal, Box, LinearProgress } from "@mui/material";
function ModalLoading({ modalOpen = true, setModalOpen }) {
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 10,
    pt: 2,
    px: 4,
    pb: 0,
  };

  return (
    <div className=" ">
      <Modal
        className="focus:border-none"
        open={modalOpen}
        PaperProps={{
          style: {
            border: "none",
            boxShadow: "none",
            borderRadius: 0,
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: "blur(0px)",
          },
        }}>
        <Box sx={{ ...style, width: 500 }}>
          <div>
            <div className="px-5 pt-4 pb-1 flex justify-center">
              <div className="text-sm">
                <div className=" text-center">
                  <p className="mb-2 text-md font-bold italic">
                    "The Most Reliable Traffic Intelligence Company"
                  </p>
                  <LinearProgress />
                </div>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex flex-wrap justify-end space-x-2"></div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalLoading;
