import React from 'react';
import { Modal, Box, Alert } from "@mui/material";

const CustomModal = ({open,onClose,bgcolor,severity,message}) => {

  return (
     <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          bgcolor: bgcolor,
          border: "1px solid gray",
          boxShadow: 24,
          borderRadius: "5px",
        }}
      >
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Box>
    </Modal>
  )
}

export default CustomModal
