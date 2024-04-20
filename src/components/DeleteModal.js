import React, { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteModal = (prop) => {
  const handleClose = () => {
    prop.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={prop.open}
        onClose={prop.setOpen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          ".MuiDialog-root": {
            opacity: 0.1,
          },
        }}
      >
        <DialogTitle>{prop.title}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {prop.item}
        </DialogContent>
        <DialogActions>
          <Button size="medium" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="medium" variant="contained" color="primary" onClick={prop.deleteFunction}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteModal;